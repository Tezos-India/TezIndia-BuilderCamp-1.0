Import Contract
contract_f017f5a4962b446eaeb83908
import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/dev/templates/fa2_lib.py")

class Token(FA2.Admin, FA2.MintNft, FA2.Fa2Nft):
    def __init__(self, admin, **kwargs):
        FA2.Fa2Nft.__init__(self, **kwargs)
        FA2.Admin.__init__(self, admin)

class Marketplace(sp.Contract):
    def __init__(self, token, metadata, admin):
        self.init(
            token=token,
            metadata=metadata,
            admin=admin,
            data=sp.big_map(
                tkey=sp.TNat,
                tvalue=sp.TRecord(
                    holder=sp.TAddress,
                    author=sp.TAddress,
                    amount=sp.TMutez,
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
        c = sp.contract(mint_params, self.data.token, entry_point="mint").open_some()

        args = [sp.record(
            to_=sp.self_address,
            metadata={ '': params.metadata })]
        sp.transfer(args, sp.mutez(0), c)
        
        self.data.data[self.data.token_id] = sp.record(
            holder=sp.self_address,
            author=sp.sender,
            amount=params.amount,
            token_id=self.data.token_id,
            collectable=True)
        self.data.token_id += 1

    def fa2_transfer(self, fa2, from_, to_, token_id, amount):
        c = sp.contract(sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress, token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), fa2, entry_point='transfer').open_some()
        sp.transfer(sp.list([sp.record(from_=from_, txs=sp.list([sp.record(amount=amount, to_=to_, token_id=token_id)]))]), sp.mutez(0), c)


    @sp.entry_point
    def collect(self, params):
        sp.verify(sp.amount == self.data.data[params.token_id].amount, "WrongAmount")
        sp.verify(self.data.data[params.token_id].collectable, "NotCollectable")
        sp.verify(self.data.data[params.token_id].author != sp.sender, "SenderNotAuthor")
        self.data.data[params.token_id].collectable = False
        self.data.data[params.token_id].holder = sp.sender

    @sp.entry_point
    def update_admin(self, params):
        sp.verify(sp.sender == self.data.admin, "NotAdmin")
        self.data.admin = params

    @sp.entry_point
    def collect_management_rewards(self, params):
        sp.verify(sp.sender == self.data.admin, "NotAdmin")
        sp.send(params.address, params.amount)

