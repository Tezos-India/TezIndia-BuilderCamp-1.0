import smartpy as sp

class WweCardNFT(sp.Contract):
    def __init__(self, admin):
        self.init(
            wrestlers=sp.big_map(),
            total_supply=sp.nat(0),
            admin=admin
        )

    @sp.entry_point
    def mint(self, params):
        sp.verify(sp.sender == self.data.admin, message="Only the admin can mint tokens")
        new_id = self.data.total_supply + 1

        balance = sp.local("balance", 1)
        self.data.wrestlers[params.address] = sp.record(
            balance=balance.value,
            wrestler_card=sp.record(
                name=params.name,
                day=params.day,
                category=params.category,
                age=params.age,
                gender=params.gender
            )
        )
        self.data.total_supply = new_id
    @sp.entry_point
    def transfer(self, params):
        sp.verify(self.data.wrestlers[sp.sender].balance >= params.amount, message="Insufficient balance")
        sp.verify(self.data.wrestlers.contains(params.to_), message="Recipient does not have a wrestling card")
    
        self.data.wrestlers[sp.sender].balance = sp.as_nat(self.data.wrestlers[sp.sender].balance - params.amount)
        self.data.wrestlers[params.to_].balance += params.amount
    
    @sp.entry_point
    def burn(self, params):
        sp.verify(self.data.wrestlers[sp.sender].balance >= params.amount, message="Insufficient balance")
        self.data.wrestlers[sp.sender].balance = sp.as_nat(self.data.wrestlers[sp.sender].balance - params.amount)
        self.data.total_supply = sp.as_nat(self.data.total_supply - params.amount)

@sp.add_test(name="WweCardNFT Test")
def test():
    scenario = sp.test_scenario()
    admin = sp.test_account("Admin")
    john = sp.test_account("John")
    randy = sp.test_account("Randy")

    contract = WweCardNFT(admin.address)
    scenario += contract

    # Mint wrestler cards
    scenario += contract.mint(
        address=john.address,
        name="John Cena",
        day="Raw",
        category="Brawler",
        age="46",
        gender="male"
    ).run(sender=admin)

    scenario += contract.mint(
        address=randy.address,
        name="Randy Orton",
        day="Smack Down",
        category="Technician",
        age="43",
        gender="male"
    ).run(sender=admin)

    # Transfer a wrestler card
    scenario += contract.transfer(
        to_=randy.address,
        amount=1
    ).run(sender=john)
    
    # Transfer a wrestler card
    scenario += contract.transfer(
        to_=john.address,
        amount=1
    ).run(sender=randy)
    
    # Burn a wrestler card
    scenario += contract.burn(
        amount=1
    ).run(sender=john)
