import smartpy as sp

class Vote(sp.Contract):
    def __init__(self):
        self.init(
            option_a_votes = sp.int(0),
            option_b_votes = sp.int(0),
            total_votes = sp.int(0)
        )
        
    @sp.entry_point
    def vote(self, params):
        choice = params.choice
        
        with sp.if_(choice == 1):
            self.data.option_a_votes += 1
        with sp.else_():
            with sp.if_(choice == 2):
                self.data.option_b_votes += 1
            with sp.else_():
                sp.failwith("Invalid choice")
        
        self.data.total_votes += 1
        
@sp.entry_point
def getWinner(self, params):
    winner_type = sp.TRecord(winner=sp.TString)
    sp.set_type(params, sp.TUnit)
    with sp.if_(self.data.option_a_votes > self.data.option_b_votes):
        sp.result(sp.record(winner="Option A"), winner_type)
    with sp.else_():
        with sp.if_(self.data.option_b_votes > self.data.option_a_votes):
            sp.result(sp.record(winner="Option B"), winner_type)
        with sp.else_():
            sp.result(sp.record(winner="Tie"), winner_type)


# Define a test function
@sp.add_test(name="Vote Test")
def test():
    scenario = sp.test_scenario()
    
    # Create a new instance of the Vote contract
    vote_contract = Vote()
    scenario += vote_contract
    
    # Test case 1: Vote for option A
    scenario.h1("Test case 1")
    scenario += vote_contract.vote(choice=1)
    winner = vote_contract.getWinner().open_some()
    scenario += sp.verify(winner == "Option A", "Invalid winner")
    
    # Test case 2: Vote for option B
    scenario.h1("Test case 2")
    scenario += vote_contract.vote(choice=2)
    winner = vote_contract.getWinner().open_some()
    scenario += sp.verify(winner == "Option B", "Invalid winner")
    
    # Test case 3: Vote for an invalid option
    scenario.h1("Test case 3")
    scenario += sp.verify_raises(vote_contract.vote(choice=3), "Invalid choice")
    
    # Test case 4: Vote multiple times for both options
    scenario.h1("Test case 4")
    for i in range(5):
        scenario += vote_contract.vote(choice=1)
    for i in range(3):
        scenario += vote_contract.vote(choice=2)
    winner = vote_contract.getWinner().open_some()
    scenario += sp.verify(winner == "Option A", "Invalid winner")
    
    # Print the final results
    scenario.h1("Final Results")
    scenario += sp.text("Option A: {}".format(vote_contract.data.option_a_votes))
    scenario += sp.text("Option B: {}".format(vote_contract.data.option_b_votes))
    scenario += sp.text("Total votes: {}".format(vote_contract.data.total_votes))
    scenario += sp.text("Winner: {}".format(winner))
