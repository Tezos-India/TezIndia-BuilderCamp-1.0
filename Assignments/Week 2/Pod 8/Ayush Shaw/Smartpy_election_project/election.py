import smartpy as sp
class Election(sp.Contract):
    def __init__(self, admin):
        #this is to conduct an election for 2 candidates
        self.init(
            election_is_open=False,
            nomination_is_open=False,
            election_admin=admin,
            candidates_votes=sp.map(tkey=sp.TAddress, tvalue=sp.TNat),
            security_deposit=sp.tez(0),
            voted=sp.set()
        )
    
    @sp.entry_point
    def set_security_deposit(self, value):
        sp.set_type(value, sp.TNat)
        sp.verify(sp.sender == self.data.election_admin, "Only election admin can change security deposit amount")
        sp.verify(~self.data.nomination_is_open, "Security deposit amount cannot be changed when nominations are open")
        sp.verify(~self.data.election_is_open, "Security deposit amount cannot be changed when election is open")
        self.data.security_deposit=sp.utils.nat_to_tez(value)
    
    @sp.entry_point
    def start_nomination(self):
        sp.verify(self.data.election_admin==sp.sender, "Only admin can allow to start nomination")
        sp.verify(~self.data.nomination_is_open, "Nomination is already open")
        sp.verify(~self.data.election_is_open, "Nomination cannot be started when election is getting conducted")
        self.data.nomination_is_open=True
        self.data.candidates_votes = sp.map(tkey=sp.TAddress, tvalue=sp.TNat)
        self.data.voted = sp.set()
    
    @sp.entry_point
    def file_nomination(self):
        sp.verify(self.data.nomination_is_open, "Nominations are closed")
        sp.verify(~self.data.candidates_votes.contains(sp.sender), "Candidate already nominated! Cannot be nominated again.")
        sp.verify(sp.amount== self.data.security_deposit, "Send correct amount for nomination")
        self.data.candidates_votes[sp.sender]=0
    
    @sp.entry_point
    def start_election(self):
        sp.verify(sp.sender== self.data.election_admin, "Only an admin can start an election")
        sp.verify(~self.data.election_is_open, "Election is already open")
        sp.verify(self.data.nomination_is_open, "Nominations have not been filed yet")
        self.data.nomination_is_open=False
        self.data.election_is_open=True

    @sp.entry_point
    def vote(self, candidate):
        sp.set_type(candidate, sp.TAddress)
        sp.verify(self.data.election_is_open, "Cannot vote, election is not open")
        sp.verify(~self.data.voted.contains(sp.sender), "Double voting not allowed")
        sp.verify(self.data.candidates_votes.contains(candidate), "This candidate has not filed any nomination")
        self.data.candidates_votes[candidate]+=1
        self.data.voted.add(sp.sender)
    
    @sp.entry_point
    def close_election(self):
        sp.verify(self.data.election_admin==sp.sender, "Only election admin can close election.")
        sp.verify(~self.data.nomination_is_open, "Election cannot be closed when nominations are going on.")
        sp.verify(self.data.election_is_open, "Election is already closed.")
        self.data.election_is_open=False
        sp.for candidate in self.data.candidates_votes.keys():
            sp.send(candidate, self.data.security_deposit)

    @sp.entry_point
    def change_admin(self, newadmin):
        sp.set_type(newadmin, sp.TAddress)
        sp.verify(sp.sender==self.data.election_admin, "Only admin can appoint another admin")
        sp.verify(self.data.election_admin != newadmin, "Previous admin and new admin cannot be same")
        self.data.election_admin = newadmin


if "templates" not in __name__:
    @sp.add_test(name="Testing voting")
    def test():
        ayush = sp.test_account("Ayush")
        harry = sp.test_account("Harry")
        subham = sp.test_account("Subham")
        mohan = sp.test_account("Mohan")
        scenario = sp.test_scenario()
        contract = Election(admin = ayush.address)
        scenario+=contract
        scenario+=contract.set_security_deposit(1).run(sender=ayush)
        scenario+=contract.start_nomination().run(sender=ayush)
        scenario+=contract.file_nomination().run(sender= harry, amount=sp.tez(1))
        scenario+=contract.file_nomination().run(sender= subham, amount=sp.tez(1))
        scenario+=contract.start_election().run(sender= ayush)
        scenario+=contract.vote(harry.address).run(sender=ayush)
        scenario+=contract.vote(subham.address).run(sender=mohan)
        scenario+=contract.vote(harry.address).run(sender=harry)
        scenario+=contract.vote(subham.address).run(sender=subham)
        scenario+=contract.close_election().run(sender=ayush)
        scenario.h1("Final state")
        scenario+=contract.start_nomination().run(sender=ayush)
        scenario+=contract.change_admin(mohan.address).run(sender=ayush)
        

        
        