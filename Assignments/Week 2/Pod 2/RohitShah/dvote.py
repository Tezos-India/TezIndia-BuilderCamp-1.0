import smartpy as sp

class DVote(sp.Contract):
    def __init__(self):
        self.init(
            candidates = sp.map(l={}, tkey=sp.TAddress, tvalue=sp.TNat),
            voters = sp.map(l={}, tkey=sp.TAddress, tvalue=sp.TBool),
            operator = sp.address("tz1WLA6aTWczqNceQNmCzkmLQeYyPJjo1WLy"),
            status = sp.bool(False),
            lastWinner = sp.test_account("").address,
            maxVotes = 0,
        )

    @sp.entry_point
    def startElection(self):
        # sanity checks
        sp.verify(sp.sender == self.data.operator, "NOT AUTHORISED")
        self.data.status = True

    @sp.entry_point
    def add_candidate(self, address):
        sp.set_type(address, sp.TAddress)

        # sanity checks
        sp.verify(self.data.status == False, "ELECTION STARTED")
        sp.verify(sp.sender == self.data.operator, "NOT_AUTHORISED")
        sp.verify(self.data.candidates.contains(address) == False, "CANDIDATE ALREADY ADDED")

        # add candidate to the map & add one vote by default
        self.data.candidates[address] = 1
        self.data.voters[address] = True

    @sp.entry_point
    def vote(self, address):
        sp.set_type(address, sp.TAddress)
        
        # sanity checks
        sp.verify(self.data.status == True, "ELECTION NOT STARTED")
        sp.verify(self.data.voters.contains(sp.sender) == False, "ALREADY VOTED")
        sp.verify(self.data.candidates.contains(address) == True, "CANDIDATE NOT FOUND")
        
        # add vote to the given address
        self.data.voters[sp.sender] = True
        self.data.candidates[address] += 1

    @sp.entry_point
    def endElection(self):
        # sanity checks
        sp.verify(self.data.operator == sp.sender, "NOT AUTHORISED")
        sp.verify(self.data.status == True, "ELECTION NOT STARTED")

        # reset the election
        maxVotes = sp.local("maxVotes", 1)
        winner = sp.local("winner", sp.test_account("").address)
        sp.for candidate in self.data.candidates.keys():
            sp.if maxVotes.value < self.data.candidates[candidate]:
                maxVotes.value = self.data.candidates[candidate]
                winner.value = candidate
        self.data.status = False
        self.data.candidates = {}
        self.data.voters = {}
        self.data.lastWinner = winner.value


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

    dvote = DVote()
    scenario += dvote

    scenario.h2("DVote")
    # add candidates
    scenario += dvote.add_candidate(alice.address).run(
        sender = admin
    )
   
    scenario += dvote.add_candidate(bob.address).run(
        sender = admin
    )

    # start the election
    scenario += dvote.startElection().run(
        sender = admin
    )


    # let other people vote
    scenario += dvote.vote(alice.address).run(
        sender = mike
    )
    scenario += dvote.vote(alice.address).run(
        sender = charles
    )
    scenario += dvote.vote(bob.address).run(
        sender = john
    )

    # end the election
    scenario += dvote.endElection().run(
        sender = admin
    )
    
    

        
        
        
