import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class Pokemon(FA2.Admin, FA2.MintNft, FA2.Fa2Nft):
    def __init__(self, admin, **kwargs):
        FA2.Fa2Nft.__init__(self, **kwargs)
        FA2.Admin.__init__(self, admin)

class PokemonMarketplace(sp.Contract):
    def __init__(self, pokemon, metadata, admin):
        self.init(
            pokemon=pokemon,
            metadata=metadata,
            admin=admin,
            data=sp.big_map(
                tkey=sp.TNat,
                tvalue=sp.TRecord(
                    holder=sp.TAddress,
                    author=sp.TAddress,
                    price=sp.TMutez,
                    token_id=sp.TNat,
                    collectable=sp.TBool)),
            token_id=0,
            )

    @sp.entry_point
    def mint(self, params):
        mint_params = sp.TList(
            sp.TRecord(
                to_=sp.TAddress,
                metadata=sp.TMap(sp.TString, sp.TBytes),
            ).layout(("to_", "metadata"))
        )
        c = sp.contract(mint_params, self.data.pokemon, entry_point="mint").open_some()

        args = [sp.record(
            to_=sp.self_address,
            metadata={ '': params.metadata })]
        sp.transfer(args, sp.mutez(0), c)

        self.data.data[self.data.token_id] = sp.record(
            holder=sp.self_address,
            author=sp.sender,
            price=params.price,
            token_id=self.data.token_id,
            collectable=True)
        self.data.token_id += 1

    def fa2_transfer(self, fa2, from_, to_, token_id, amount):
        c = sp.contract(sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress, token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), fa2, entry_point='transfer').open_some()
        sp.transfer(sp.list([sp.record(from_=from_, txs=sp.list([sp.record(amount=amount, to_=to_, token_id=token_id)]))]), sp.mutez(0), c)

    @sp.entry_point
    def buy(self, params):
        sp.verify(self.data.data[params.token_id].collectable, "NotCollectable")
        sp.verify(self.data.data[params.token_id].holder != sp.sender, "AlreadyOwnsPokemon")
        sp.verify(sp.amount >= self.data.data[params.token_id].price, "InsufficientFunds")

        self.data.data[params.token_id].collectable = False
        self.fa2_transfer(self.data.pokemon, self.data.data[params.token_id].holder, sp.sender, self.data.data[params.token_id].token_id, 1)
        self.data.data[params.token_id].holder = sp.sender

    @sp.entry_point
    def update_admin(self, params):
        sp.verify(sp.sender == self.data.admin, "NotAdmin")
        self.data.admin = params

    @sp.entry_point
    def withdraw(self, params):
        sp.verify(sp.sender == self.data.admin, "NotAdmin")
        sp.send(params.address, params.amount)


@sp.add_test(name = "Pokemon MarketPlace")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("admin")
    mark = sp.test_account("mark")
    elon = sp.test_account("elon")

    token_contract = Pokemon(
        admin=admin.address,
        metadata=sp.utils.metadata_of_url(
            "ipfs://QmPWNEudUEWGMvjYJJUAMHT6WoZ5Vi5VTTKXLDV7mbgfmA"))
    scenario += token_contract

    scenario.h1("Pokemon MarketPlace")
    marketplace = PokemonMarketplace(
        token_contract.address,
        sp.utils.metadata_of_url(
            "ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb"
        ), admin.address)
    scenario += marketplace

    marketplace.mint(
        price=sp.tez(100),
        metadata=sp.pack(
            "ipfs://bafyreibwl5hhjgrat5l7cmjlv6ppwghm6ijygpz2xor2r6incfcxnl7y3e/metadata.json"
    )).run(sender=admin, valid=False, exception="FA2_NOT_ADMIN")
    token_contract.set_administrator(marketplace.address).run(sender=admin)
    
    marketplace.mint(
        price=sp.tez(100),
        metadata= sp.pack(
            "ipfs://bafyreibwl5hhjgrat5l7cmjlv6ppwghm6ijygpz2xor2r6incfcxnl7y3e/metadata.json"
        )).run(sender=admin)
    
    marketplace.mint(price=sp.mutez(2_400_000), metadata=sp.pack("123423")).run(sender=mark)
    
    
