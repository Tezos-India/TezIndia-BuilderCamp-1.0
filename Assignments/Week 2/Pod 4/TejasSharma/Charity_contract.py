import smartpy as sp

class Charity(sp.Contract):
    def __init__(self):
        #storage
        self.init(
            ngo_list = sp.map(l = {}, 
                              tkey = sp.TString, 
                              tvalue = sp.TRecord(owner = sp.TAddress, money_sent = sp.TNat)),
            
            max_allowed_charity = sp.int(10),
            admin = sp.address("tz1Yr67qu5KpFqJnW2v1GEtSXo4XhYWFgAom")
        )

    @sp.entry_point
    def register(self, params):
        sp.verify(self.data.max_allowed_charity > 0)
        
        self.data.ngo_list[params.name] = sp.record(owner = sp.sender, money_sent = sp.nat(0))
        self.data.max_allowed_charity -= 1

    @sp.entry_point
    def send_money(self, params):
        #verify 
        sp.verify(sp.amount >= sp.tez(1), "NOT SUFFICIENT FUNDS")
        sp.verify(self.data.ngo_list.contains(params.name), "CHARITY NOT PRESENT")
        
        self.data.ngo_list[params.name].money_sent += sp.utils.mutez_to_nat(sp.amount)
        destination = self.data.ngo_list[params.name].owner
        sp.send(destination, sp.amount)

    @sp.entry_point
    def remove_charity(self, params):
        sp.verify(sp.sender == self.data.admin)
        sp.verify(self.data.ngo_list.contains(params.name), "CHARITY NOT PRESENT")
        
        del self.data.ngo_list[params.name]
        self.data.max_allowed_charity += 1

@sp.add_test(name = "main")
def test():
    scenario = sp.test_scenario()

    #Test accounts
    alice = sp.test_account("alice")
    admin = sp.test_account("admin")
    ngo1 = sp.test_account("ngo1")
    ngo2 = sp.test_account("ngo2")

    charity = Charity()
    scenario += charity

    #Run tests
    scenario += charity.register(name = "ngo2").run(
        sender = ngo2
    )
    scenario += charity.send_money(name = "ngo2").run(
        amount = sp.tez(1)
    )
    scenario += charity.remove_charity(name = "ngo2").run(sender = sp.address("tz1Yr67qu5KpFqJnW2v1GEtSXo4XhYWFgAom"))

    