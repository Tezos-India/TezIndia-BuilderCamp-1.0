import smartpy as sp

fa2 = sp.io.import_template("fa2_lib.py")

class NftTest(
    fa2.Admin,
    fa2.ChangeMetadata,
    fa2.WithdrawMutez,
    fa2.MintNft,
    fa2.BurnNft,
    fa2.OnchainviewBalanceOf,
    fa2.OffchainviewTokenMetadata,
    fa2.Fa2Nft,
    sp.Contract
):
    def __init__(self, admin, metadata, token_metadata = {}, ledger = {}, policy = None, metadata_base = None):
        fa2.Fa2Nft.__init__(self, metadata, token_metadata = token_metadata, ledger = ledger, policy = policy, metadata_base = metadata_base)
        fa2.Admin.__init__(self, admin)

class Building(sp.Contract):
    def __init__(self, nftContract):
        self.init(        
            admin_acc = sp.address("tz1Yr67qu5KpFqJnW2v1GEtSXo4XhYWFgAom"),
            # admin_acc = sp.test_account("Admin").address,
            apartmentList = sp.big_map(l = {}, 
                                       tkey = sp.TString, 
                                       tvalue = sp.TPair(sp.TAddress, sp.TNat)
                                    ),
            nftTarget = sp.address("KT1T29PtP3cJMqR5HSgg6G49T15LuEon1jDC"),
            # nftTarget = nftContract,
            token_num = sp.nat(0),
            tokenMap = sp.big_map(l = {},
                                 tkey = sp.TString,
                                 tvalue = sp.TNat)
        )

    @sp.entry_point
    def createPlot(self, params):
        sp.verify(sp.sender == self.data.admin_acc, "ONLY ADMIN ALLOWED TO MINT")
        sp.if self.data.apartmentList.contains(params.houseId):
            sp.failwith("This house is already minted. Mint with another house")
        sp.else:
            self.data.apartmentList[params.houseId] = sp.pair(sp.self_address, params.amt)
            self.data.tokenMap[params.houseId] = self.data.token_num
            self.data.token_num += 1
        
        c = sp.contract(sp.TList(sp.TRecord(
                                        to_=sp.TAddress,
                                        metadata=sp.TMap(sp.TString, sp.TBytes),
                                        ).layout(("to_", "metadata"))
                                ),
                        self.data.nftTarget,
                        entry_point="mint").open_some()
        
        mydata = sp.list(l = [sp.record(
                        to_= sp.self_address,
                        metadata = params.token_metadata)
                        ])
        sp.transfer(mydata,sp.mutez(0),c)
        
    @sp.entry_point
    def sellPlotCustomer(self, params):
        sp.verify(self.data.apartmentList.contains(params.houseId), "House not present")
        sp.verify(params.amt >= sp.snd(self.data.apartmentList[params.houseId]), "Incorrect amount")
        sp.verify(sp.amount == sp.utils.nat_to_mutez(params.amt), "send correct amt")

        self.data.apartmentList[params.houseId] = sp.pair(params.address, sp.snd(self.data.apartmentList[params.houseId]))
        extra_amount = sp.amount - sp.utils.nat_to_mutez(sp.snd(self.data.apartmentList[params.houseId]))
        sp.send(params.address, extra_amount, "EXTRA CHANGE")
        c = sp.contract(
            sp.TList(
                sp.TRecord(from_=sp.TAddress,
                            txs=sp.TList(
                                        sp.TRecord(
                                        to_=sp.TAddress,
                                        token_id=sp.TNat,
                                        amount=sp.TNat,
                                                ).layout(("to_", ("token_id", "amount")))
                                        ),
                            ).layout(("from_", "txs"))
                    ),
            self.data.nftTarget,
            entry_point = "transfer"
        ).open_some()

        mydata = sp.list( l = [ sp.record(from_ = sp.self_address, 
                                          txs = sp.list(l = [                                              
                                              sp.record(to_ = params.address,
                                                        token_id = self.data.tokenMap[params.houseId],
                                                        amount = sp.nat(1))
                                          ]
                                          ))
                        ]
        )
        sp.transfer(mydata, sp.mutez(0), c)
    
@sp.add_test(name = "main")
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account("Admin")
    alice = sp.test_account("alice")
    tok0_md = fa2.make_metadata(name="Token Zero", decimals=1, symbol="Tok0")
    tok1_md = fa2.make_metadata(name="Token One", decimals=1, symbol="Tok1")
    tok2_md = fa2.make_metadata(name="Token Two", decimals=1, symbol="Tok2")
    TOKEN_METADATA = [tok0_md, tok1_md, tok2_md]
    METADATA = sp.big_map({"": sp.utils.bytes_of_string("https://example.com")})
    tkn_md = fa2.make_metadata(name = "ValmarkA101", 
                               decimals = 9, 
                               symbol = "Valmark")

    NFTtest = NftTest(admin.address, METADATA)
    scenario += NFTtest
    # building = Building(sp.address("KT1T29PtP3cJMqR5HSgg6G49T15LuEon1jDC"))
    building = Building(NFTtest.address)
    scenario += building

    scenario += NFTtest.set_administrator(building.address).run(sender = admin)
    sp.verify(NFTtest.is_administrator(admin.address) == True, "nope")
    scenario += building.createPlot(houseId = "ValmarkA101", amt = sp.nat(5), token_metadata = tkn_md).run(
        sender = admin,
    )
    scenario += building.sellPlotCustomer(houseId = "ValmarkA101", address = sp.string(alice.address), amt = sp.nat(6)).run(
        sender = alice,
        amount = sp.mutez(6)
    )



