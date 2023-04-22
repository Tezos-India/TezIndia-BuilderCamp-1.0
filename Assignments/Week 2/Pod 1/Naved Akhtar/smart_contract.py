import smartpy as sp

class Voting(sp.Contract):
    def __init__(self):
        self.init(
            candidates = sp.map(l={}, tkey=sp.TAddress, tvalue=sp.TNat),
            voters = sp.map(l={}, tkey=sp.TAddress, tvalue=sp.TBool),
            administrator = sp.address("tz1WLA6aTWczqNceQNmCzkmLQeYyPJjo1WLy"),
            isElectionStarted = sp.bool(False),
            winner = sp.test_account("").address,
            maxVotes = 0,
        )

    @sp.entry_point
    def start_election(self):
        sp.verify(sp.sender == self.data.administrator, "NOT AUTHORISED")
        self.data.isElectionStarted = True

    @sp.entry_point
    def add_candidate(self, candidate_address):
        sp.set_type(candidate_address, sp.TAddress)

        sp.verify(self.data.isElectionStarted == False, "ELECTION STARTED")
        sp.verify(sp.sender == self.data.administrator, "NOT_AUTHORISED")
        sp.verify(self.data.candidates.contains(candidate_address) == False, "CANDIDATE ALREADY ADDED")

        self.data.candidates[candidate_address] = 1
        self.data.voters[candidate_address] = True

    @sp.entry_point
    def vote(self, candidate_address):
        sp.set_type(candidate_address, sp.TAddress)
        
        sp.verify(self.data.isElectionStarted == True, "ELECTION NOT STARTED")
        sp.verify(self.data.voters.contains(sp.sender) == False, "ALREADY VOTED")
        sp.verify(self.data.candidates.contains(candidate_address) == True, "CANDIDATE NOT FOUND")
        
        self.data.voters[sp.sender] = True
        self.data.candidates[candidate_address] += 1

    @sp.entry_point
    def end_election(self):
        sp.verify(self.data.administrator == sp.sender, "NOT AUTHORISED")
        sp.verify(self.data.isElectionStarted == True, "ELECTION NOT STARTED")

        max_votes = sp.local("maxVotes", 1)
        winner = sp.local("winner", sp.test_account("").address)
        sp.for candidate in self.data.candidates.keys():
            sp.if max_votes.value < self.data.candidates[candidate]:
                max_votes.value = self.data.candidates[candidate]
                winner.value = candidate
        self.data.isElectionStarted = False
        self.data.candidates = {}
        self.data.voters = {}
        self.data.winner = winner.value


@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()

    # test accounts
    admin = sp.address("tz1WLA6aTWczqNceQNmCzkmLQeYyPJjo1WLy")
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    mike = sp.test_account("mike")
    charles = sp.test_account("charles")
    john = sp.test_account("john")

    voting = Voting()
    scenario += voting

    scenario.h2("Voting")
    # add candidates
    scenario += voting.add_candidate(alice.address).run(
        sender = admin
    )
   
    scenario += voting.add_candidate(bob.address).run(
        sender = admin
    )

    # start the election
    scenario += voting.start_election().run(
        sender = admin
    )


    # let other people vote
    scenario += voting.vote(alice.address).run(
        sender = mike  
        
    )
    scenario += voting.vote(alice.address).run(
        sender = charles
    )
    scenario += voting.vote(bob.address).run(
        sender = john
    )

    # end the election
    scenario += voting.end_election().run(
        sender = admin
    )