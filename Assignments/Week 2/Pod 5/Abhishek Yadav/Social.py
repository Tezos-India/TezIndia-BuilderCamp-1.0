import smartpy as sp

class Post(sp.Contract):
    def __init__(self, author, content):
        self.init(
            author = author,
            content = content,
            likes = 0,
            dislikes = 0
        )

    @sp.entry_point
    def like(self, params):
        self.data.likes += 1

    @sp.entry_point
    def dislike(self, params):
        self.data.dislikes += 1

class SocialMedia(sp.Contract):
    def __init__(self):
        self.init(
            posts = {}
        )

    @sp.entry_point
    def create_post(self, params):
        post = Post(params.author, params.content)
        self.data.posts[post.hash] = post

    @sp.entry_point
    def like_post(self, params):
        post = self.data.posts[params.post_hash]
        post.like()

    @sp.entry_point
    def dislike_post(self, params):
        post = self.data.posts[params.post_hash]
        post.dislike()

    @sp.entry_point
    def get_post(self, params):
        post = self.data.posts.get(params.post_hash)
        if post is None:
            sp.fail("Post not found")
        return post

if "templates" not in __name__:
    @sp.add_test(name = "Social Media")
    def test():
        alice = sp.test_account("Alice")
        bob = sp.test_account("Bob")

        social_media = SocialMedia()

        # Alice creates a post
        sp.transfer(None, sp.mutez(100).to_sp_address(), social_media.create_post(author = alice.address, content = "Hello, World!").sp_value)

        # Bob tries to get Alice's post
        with sp.assertion_raises():
            sp.transfer(None, sp.mutez(0).to_sp_address(), social_media.get_post(post_hash = "invalid_hash").sp_value)

        # Alice likes her own post
        sp.transfer(None, sp.mutez(0).to_sp_address(), social_media.like_post(post_hash = social_media.data.posts.keys()[0]).sp_value)

        # Bob dislikes Alice's post
        sp.transfer(None, sp.mutez(0).to_sp_address(), social_media.dislike_post(post_hash = social_media.data.posts.keys()[0]).sp_value)

        # Check that the post has 1 like and 1 dislike
        post = social_media.get_post(post_hash = social_media.data.posts.keys()[0]).open_some()
        sp.verify(post.likes == 1)
        sp.verify(post.dislikes == 1)
