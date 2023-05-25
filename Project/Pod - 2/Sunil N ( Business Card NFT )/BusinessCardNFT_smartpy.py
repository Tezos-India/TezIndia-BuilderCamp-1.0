# Contract deployed @ KT1Jfjh9MNzUzF4GAUfdWA7oZoXGb8U9kfNV
# Check out https://ghostnet.tzkt.io/KT1Jfjh9MNzUzF4GAUfdWA7oZoXGb8U9kfNV

import smartpy as sp

class BusinessCardNFT(sp.Contract):
    def __init__(self, admin):
        self.init(
            ledger=sp.big_map(),
            total_supply=sp.nat(0),
            admin=admin
        )

    @sp.entry_point
    def mint(self, address, name, title, company, email, phone):
        sp.verify(sp.sender == address, message="You can only mint your own tokens")
        new_id = self.data.total_supply + 1

        balance = sp.local("balance", 1)
        self.data.ledger[address] = sp.record(
            balance=balance.value,
            business_card=sp.record(
                name=name,
                title=title,
                company=company,
                email=email,
                phone=phone
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

@sp.add_test(name="BusinessCardNFT Test")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("Admin")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")

    contract = BusinessCardNFT(admin.address)
    scenario += contract

    # # Mint business cards
    scenario += contract.mint(
        address=alice.address,
        name="Alice",
        title="Software Engineer",
        company="Tech Co.",
        email="alice@example.com",
        phone="123-456-7890"
    ).run(sender=alice.address)

    scenario += contract.mint(
        address=bob.address,
        name="Bob",
        title="Product Manager",
        company="Innovate Inc.",
        email="bob@example.com",
        phone="987-654-3210"
    ).run(sender=bob.address)

    # Transfer a business card
    scenario += contract.transfer(
        to_=bob.address,
        amount=1
    ).run(sender=alice)
    
    # Transfer a business card
    scenario += contract.transfer(
        to_=alice.address,
        amount=1
    ).run(sender=bob)
    
    # Burn a business card
    scenario += contract.burn(
        amount=1
    ).run(sender=alice)
