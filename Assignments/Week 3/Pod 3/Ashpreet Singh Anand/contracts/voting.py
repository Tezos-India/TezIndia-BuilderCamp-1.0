import smartpy as sp

class Voting(sp.Contract):
    def __init__(self):
        #Storage
        self.init(
            voters = sp.map(l = {}, tkey = sp.TAddress , tvalue = sp.TBool ),
            candidateA_votes = sp.nat(0),
            candidateB_votes = sp.nat(0),
            total_votes = sp.nat(0),
            admin = sp.address("tz1UjL2KnKcy35nVvnJ4WxTkg2SNv5MD6k5e")
          
            )

    def _onlyAdmin(self):
        sp.verify(sp.sender == self.data.admin,"Not Authorized")
    
    def _reset_data(self):
        self.data.voters = {}
        self.data.candidateA_votes = sp.nat(0)
        self.data.candidateB_votes = sp.nat(0)
        self.data.total_votes = sp.nat(0)


    @sp.entry_point
    def vote_for_candidate_A(self):  

        #Assertions
        sp.verify(self.data.voters.contains(sp.sender)==sp.bool(False) , "User has already voted")
        
        #Storage Changes

        self.data.voters[sp.sender] = sp.bool(True)
        self.data.candidateA_votes = self.data.candidateA_votes + 1
        self.data.total_votes = self.data.total_votes + 1

    @sp.entry_point
    def vote_for_candidate_B(self):  

        #Assertions
        sp.verify(self.data.voters.contains(sp.sender)==sp.bool(False) , "User has already voted")
        
        #Storage Changes

        self.data.voters[sp.sender] = sp.bool(True)
        self.data.candidateB_votes = self.data.candidateB_votes + 1
        self.data.total_votes = self.data.total_votes + 1
    


    @sp.entry_point
    def reset_voting(self):  

        #Assertions
        self._onlyAdmin()
        
        #Reset Data
        self._reset_data()
        
@sp.add_test(name="main")
def test():

    scenario = sp.test_scenario()

    #Test accounts

    admin  = sp.test_account("admin")
    a  = sp.test_account("a")
    b = sp.test_account("b")
    c   = sp.test_account("c")
    d  = sp.test_account("d")
    e  = sp.test_account("e")

    #Contract Instance

    voting = Voting()
    scenario += voting

    #vote_for_candidate_A

    scenario +=  voting.vote_for_candidate_A().run(sender = a)
    scenario +=  voting.vote_for_candidate_A().run(sender = b)
    scenario +=  voting.vote_for_candidate_A().run(sender = c) 
    #vote_for_candidate_B
    scenario +=  voting.vote_for_candidate_B().run(sender = d)
    scenario +=  voting.vote_for_candidate_B().run(sender = e)

    #Duplicate voting test

    #Reset Voting
    scenario +=  voting.reset_voting().run(sender = sp.address("tz1UjL2KnKcy35nVvnJ4WxTkg2SNv5MD6k5e"))
