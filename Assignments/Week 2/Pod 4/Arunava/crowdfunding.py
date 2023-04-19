import smartpy as sp

class Crowdfunding(sp.Contract):
    def __init__(self, goal, deadline):
        self.init(
            goal=goal, # the funding goal
            deadline=deadline, # the deadline for the campaign (in seconds since epoch)
            total_funds=sp.mutez(0), # the total funds raised so far
            contributions={}, # a dictionary of contributions from each address
            ended=False # whether the campaign has ended or not
        )
        
    @sp.entry_point
    def contribute(self):
        sp.verify(sp.amount > 0, message="contribution amount must be positive")
        sp.verify(sp.now < self.data.deadline, message="campaign has ended")
        self.data.total_funds += sp.amount
        
        if sp.sender in self.data.contributions:
            self.data.contributions[sp.sender] += sp.amount
        else:
            self.data.contributions[sp.sender] = sp.amount
            
    @sp.entry_point
    def withdraw(self):
        sp.verify(self.data.ended, message="campaign has not ended")
        sp.verify(self.data.total_funds >= self.data.goal, message="funding goal not reached")
        sp.verify(sp.sender in self.data.contributions, message="sender has not contributed")
        
        contribution = self.data.contributions[sp.sender]
        del self.data.contributions[sp.sender]
        sp.transfer(sp.sender, contribution)
        
    @sp.entry_point
    def end_campaign(self):
        sp.verify(sp.now >= self.data.deadline, message="campaign has not ended")
        self.data.ended = True
        
    def get_contributions(self):
        return sp.big_map(self.data.contributions)