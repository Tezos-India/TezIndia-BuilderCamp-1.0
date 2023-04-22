import smartpy as sp

class SelfHelp(sp.Contract):
    def __init__(self):
        self.init(

            # memberOfShg = sp.map(l ={},tkey = sp.TAddress, tvalue = sp.TSet(t=sp.TNat)),
            memberOfShg = sp.map(l ={},tkey = sp.TAddress, tvalue = sp.TNat),
  
            shgDetails = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TRecord(admin = sp.TAddress,shgName = sp.TString,shgDescription = sp.TString,timeOfCreation = sp.TTimestamp,balance=sp.TMutez,funderDetails = sp.TMap(k=sp.TAddress, v=sp.TMutez),numberOfFunders=sp.TInt,funders= sp.TSet(t=sp.TAddress))),
            
            shgId = sp.nat(0),

            #Mapping from shgId to Proposal Id. Currently only one can be mapped rn
            proposalIdInShg = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TSet(t=sp.TNat)),

            #Mapping from id to proposal
            proposalDetails = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TRecord(proposer = sp.TAddress,proposalName = sp.TString,proposalDescription = sp.TString,amount = sp.TMutez,votesInFavour = sp.TInt,votesAgainst = sp.TInt,timeOfProposal = sp.TTimestamp,votersInFavour = sp.TSet(t=sp.TAddress),votersAgainst = sp.TSet(t=sp.TAddress))),
    
            #Ids 
            proposalId = sp.nat(0)
        )


    @sp.entry_point
    def add_shg(self,params):
        
        sp.set_type(params, sp.TRecord(_shgName=sp.TString,_shgDescription=sp.TString))

        self.data.shgId+=1
        
        self.data.shgDetails[self.data.shgId] = sp.record(admin = sp.sender,shgName = params._shgName,shgDescription = params._shgDescription,timeOfCreation = sp.now,balance = sp.utils.nat_to_mutez(0),funderDetails=sp.map(l = {}, tkey=sp.TAddress, tvalue=sp.TMutez),numberOfFunders=sp.int(0),funders=sp.set())




        
    
    @sp.entry_point
    def add_funds(self,_shgId):  
        

        sp.if self.data.shgDetails[_shgId].funderDetails.contains(sp.sender):
            self.data.shgDetails[_shgId].funderDetails[sp.sender] = self.data.shgDetails[_shgId].funderDetails[sp.sender]+sp.amount
        
        sp.else:
            self.data.shgDetails[_shgId].funderDetails[sp.sender] = sp.amount
            self.data.shgDetails[_shgId].numberOfFunders+=1
            self.data.shgDetails[_shgId].funders.add(sp.sender)


    
            # sp.if self.data.memberOfShg.contains(sp.sender):
        
            #     self.data.memberOfShg[sp.sender].add(_shgId)
                
            # sp.else:
            #     self.data.memberOfShg[sp.sender] = sp.set([_shgId], t = sp.TNat)

            # sp.if sp.len(self.data.shgDetails[_shgId].funders) == 0:
            #     self.data.shgDetails[_shgId].funders = sp.set([sp.sender], t = sp.TAddress)
            # sp.else:
            #     self.data.shgDetails[_shgId].funders.add(sp.sender)

        self.data.memberOfShg[sp.sender] = _shgId
        
    
        self.data.shgDetails[_shgId].balance = self.data.shgDetails[_shgId].balance + sp.amount
       


    @sp.entry_point
    def proposal(self,params):
        
        sp.set_type(params, sp.TRecord(_shgId=sp.TNat,_proposalName=sp.TString,_proposalDescription=sp.TString,_amount = sp.TMutez))
        sp.verify(self.data.shgDetails[params._shgId].funderDetails.contains(sp.sender))
        sp.verify(params._amount<=self.data.shgDetails[params._shgId].balance)
        

        self.data.proposalId+=1
        
        sp.if self.data.proposalIdInShg.contains(params._shgId):
            self.data.proposalIdInShg[params._shgId].add(self.data.proposalId)
        sp.else:
            self.data.proposalIdInShg[params._shgId] = sp.set([self.data.proposalId], t = sp.TNat)

            

        
        self.data.proposalDetails[self.data.proposalId] = sp.record(proposer = sp.sender,proposalName = params._proposalName,proposalDescription = params._proposalDescription,amount = params._amount,votesInFavour = 0,votesAgainst = 0,timeOfProposal = sp.now,votersInFavour = sp.set(t = sp.TAddress),votersAgainst = sp.set(t = sp.TAddress))
        
        
        


    @sp.entry_point
    def votingInFavour(self,tempId):

        #check in frontend if current timestamp is more than the deadline then call the function

    
        sp.verify(sp.sender != self.data.proposalDetails[tempId].proposer,"The proposer can't vote")

    
        sp.verify(~ self.data.proposalDetails[tempId].votersInFavour.contains(sp.sender),"Each member can give only one vote")
        
        
        sp.if self.data.proposalDetails[tempId].votesInFavour == 0:
            

            self.data.proposalDetails[tempId].votersInFavour = sp.set([sp.sender], t = sp.TAddress)
            self.data.proposalDetails[tempId].votesInFavour += 1
        
        sp.else:
        

            self.data.proposalDetails[tempId].votersInFavour.add(sp.sender)
            self.data.proposalDetails[tempId].votesInFavour += 1





    @sp.entry_point
    def votingAgainst(self,tempId):

        #check in frontend if current timestamp is more than the deadline then call the function

    
        sp.verify(sp.sender != self.data.proposalDetails[tempId].proposer,"The proposer can't vote")

    
        sp.verify(~ self.data.proposalDetails[tempId].votersAgainst.contains(sp.sender),"Each member can give only one vote")
        
        
        sp.if self.data.proposalDetails[tempId].votesAgainst == 0:
            

            self.data.proposalDetails[tempId].votersAgainst = sp.set([sp.sender], t = sp.TAddress)
            self.data.proposalDetails[tempId].votesAgainst += 1
        
        sp.else:
        

            self.data.proposalDetails[tempId].votersAgainst.add(sp.sender)
            self.data.proposalDetails[tempId].votesAgainst += 1


    @sp.entry_point
    def claimFund(self,params):
        sp.set_type(params, sp.TRecord(_shgId=sp.TNat,_proposalId=sp.TNat))
        sp.verify(sp.sender == self.data.proposalDetails[params._proposalId].proposer,"Only the proposer can claim amount")
        sp.verify(self.data.proposalDetails[params._proposalId].amount<=self.data.shgDetails[params._shgId].balance,"The asked funds are less than the current balance of the SHG. Come again later.")
        sp.send(sp.sender, self.data.proposalDetails[params._proposalId].amount)
        self.data.shgDetails[params._shgId].balance = self.data.shgDetails[params._shgId].balance - self.data.proposalDetails[params._proposalId].amount
        self.data.proposalDetails[params._proposalId].amount = sp.utils.nat_to_mutez(0)
        





        

    # @sp.entry_point
    # def voteRemove(self,tempId):

    #     ##check in frontend if current timestamp is more than the deadline then call the function
        
    #     sp.verify(self.data.proposalDetails[tempId].votersInFavour.contains(sp.sender),"You have not voted")
    #     self.data.proposalDetails[tempId].votersInFavour.remove(sp.sender)
    #     self.data.proposalDetails[tempId].votesInFavour -= 1
        
            


@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()

    # Test address
    admin = sp.test_account("admin")
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    charles = sp.test_account("charles")
    

    # Create contract
    auction = SelfHelp() 
    scenario += auction

    # change_num_values
    scenario.h2("Auction Test 1")   
    
    scenario += auction.add_shg(_shgName="Ankit",_shgDescription="lkdsfjdklsdjfkl").run(sender = alice,valid = False)
    scenario += auction.add_shg(_shgName="Ankit",_shgDescription="lkdsfjdklsdjfkl").run(sender = alice,valid = False)
    scenario += auction.add_shg(_shgName="Ankit",_shgDescription="lkdsfjdklsdjfkl").run(sender = alice,valid = False)
  
    scenario += auction.add_funds(1).run(amount = sp.utils.nat_to_mutez(200),sender = alice,valid = False)
    scenario += auction.add_funds(1).run(amount = sp.utils.nat_to_mutez(200),sender = bob,valid = False)
    scenario += auction.add_funds(1).run(amount = sp.utils.nat_to_mutez(200),sender = bob,valid = False)
    scenario += auction.add_funds(3).run(amount = sp.utils.nat_to_mutez(100),sender = alice,valid = False)
    

    scenario += auction.proposal(_shgId=3,_proposalName="Something",_proposalDescription="Nothing",_amount=sp.utils.nat_to_mutez(100)).run(sender = alice,now = sp.timestamp(36))
    scenario += auction.proposal(_shgId=1,_proposalName="Something",_proposalDescription="Nothing",_amount=sp.utils.nat_to_mutez(100)).run(sender = alice,now = sp.timestamp(36))
    scenario += auction.proposal(_shgId=1,_proposalName="Something",_proposalDescription="Nothing",_amount=sp.utils.nat_to_mutez(100)).run(sender = alice,now = sp.timestamp(36))
    
    scenario += auction.votingInFavour(1).run(sender = alice,valid = False,now = sp.timestamp(26))
    scenario += auction.votingInFavour(1).run(sender = bob,now = sp.timestamp(26),valid = False)
    scenario += auction.votingInFavour(1).run(sender = charles,now = sp.timestamp(26),valid = False)
    scenario += auction.votingInFavour(1).run(sender = admin,now = sp.timestamp(26),valid = False)
    scenario += auction.votingInFavour(1).run(sender = charles,valid = False,now = sp.timestamp(26))
    scenario += auction.votingInFavour(1).run(sender = charles,valid = False,now = sp.timestamp(26))
    scenario += auction.votingAgainst(1).run(sender = charles,valid = False,now = sp.timestamp(26))
    scenario += auction.claimFund(_shgId=3,_proposalId=1).run(sender = alice,valid = False,now = sp.timestamp(26))
    

        


