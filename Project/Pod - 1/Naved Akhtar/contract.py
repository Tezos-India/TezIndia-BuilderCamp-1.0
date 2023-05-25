import smartpy as sp
import random
import string

seed = ''.join(random.choice(string.ascii_lowercase) for i in range(20))


class MemeNFT(sp.Contract):
    def __init__(self, admin):
        admin = sp.test_account(seed)  # Create new admin account
        self.init(
            ledger=sp.big_map(),
            total_supply=sp.nat(0),
            admin=admin.address  # Use admin account address as admin parameter
        )
    

    @sp.entry_point
    def mint(self, address, name, genre, music, origin, format):
        sp.verify(sp.sender == address, message="Mint your memes")
        new_id = self.data.total_supply + 1

        balance = sp.local("balance", 1)
        self.data.ledger[address] = sp.record(
            balance=balance.value,
            meme_info=sp.record(
                name=name,
                genre=genre,
                music=music,
                origin=origin,
                format=format
            )
        )
        self.data.total_supply = new_id
    @sp.entry_point
    def transfer(self, params):
        sp.verify(self.data.ledger[sp.sender].balance >= params.amount, message="Not enough balance")
        sp.verify(self.data.ledger.contains(params.to_), message="Recipient does not have any memes")
    
        self.data.ledger[sp.sender].balance = sp.as_nat(self.data.ledger[sp.sender].balance - params.amount)
        self.data.ledger[params.to_].balance += params.amount
    
    @sp.entry_point
    def burn(self, params):
        sp.verify(self.data.ledger[sp.sender].balance >= params.amount, message="Not enough balance")
        self.data.ledger[sp.sender].balance = sp.as_nat(self.data.ledger[sp.sender].balance - params.amount)
        self.data.total_supply = sp.as_nat(self.data.total_supply - params.amount)

@sp.add_test(name="MemeNFT Test")
def test():
    scenario = sp.test_scenario()
    
    admin = sp.test_account("seed")
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")

    contract = MemeNFT(admin.address)
    scenario += contract

    # # Mint Memes
    scenario += contract.mint(
        address=alice.address,
        name="Cat",
        genre="dank",
        music="funny meow",
        origin="2022",
        format="video"
    ).run(sender=alice.address)

    scenario += contract.mint(
        address=bob.address,
        name="Dog",
        genre="dank",
        music="bark",
        origin="2021",
        format="video"
    ).run(sender=bob.address)

    # Transfer a Meme
    scenario += contract.transfer(
        to_=bob.address,
        amount=0  # Transfer first minted Meme from Alice to Bob
    ).run(sender=alice)

    # Transfer a Meme
    scenario += contract.transfer(
        to_=alice.address,
        amount=1  # Transfer second minted Meme from Bob to Alice
    ).run(sender=bob)

    # Burn a Meme
    scenario += contract.burn(
        amount=0  # Burn the first minted Meme by Alice
    ).run(sender=alice.address)