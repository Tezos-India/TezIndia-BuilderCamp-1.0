import smartpy as sp

class TezEventNFT(sp.Contract):
    def __init__(self, admin):
        self.init(
            ledger=sp.big_map(),
            total_supply=sp.nat(0),
            admin=admin
        )

    @sp.entry_point
    def mint(self, params):
        sp.verify(sp.sender == self.data.admin, message="Only the admin can mint the ticket")
        new_id = self.data.total_supply + 1

        balance = sp.local("balance", 1)
        self.data.ledger[params.address] = sp.record(
            balance=balance.value,
            business_card=sp.record(
                name=params.name,
                email = params.email,
                phone = params.phone,
                address = params.address
            )
        )
        self.data.total_supply = new_id

    @sp.entry_point
    def transfer(self, params):
        sp.verify(self.data.ledger[sp.sender].balance >= params.amount, message="Insufficient balance")
        sp.verify(self.data.ledger.contains(params.to_), message="Recipient does not have a business card")
    
        self.data.ledger[sp.sender].balance = sp.as_nat(self.data.ledger[sp.sender].balance - params.amount)
        self.data.ledger[params.to_].balance += params.amount
        
    @sp.entry_point
    def burn(self, params):
        sp.verify(self.data.ledger[sp.sender].balance >= params.amount, message="Insufficient balance")
        self.data.ledger[sp.sender].balance = sp.as_nat(self.data.ledger[sp.sender].balance - params.amount)
        self.data.total_supply = sp.as_nat(self.data.total_supply - params.amount)

@sp.add_test(name="Event tickets Test")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("Admin")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    tezos = sp.test_account("tezos")
    temple = sp.test_account("temple")

    contract = TezEventNFT(admin.address)
    scenario += contract

    # Minting Tezos event NFT
    scenario += contract.mint(
        address=alice.address,
        name="Admin",
        email="sudharshan32@gmail.com",
        phone="9876543210",
        physicalAddress="D.no: 5/ Bangalore"
    ).run(sender=admin)
    
    # Minting Tezos event NFT
    scenario += contract.mint(
        address=bob.address,
        name="Tezos",
        email="tezos@gmail.com",
        phone="9865443510",
        physicalAddress="D.no: 54-3, Chennai"
    ).run(sender=admin)
    
    # Transfering event ticket
    scenario += contract.transfer(
        to_=temple.address,
        amount=1
    ).run(sender=alice,valid=False)

    # Burning event ticket
    scenario += contract.burn(
        amount=1
    ).run(sender=alice)