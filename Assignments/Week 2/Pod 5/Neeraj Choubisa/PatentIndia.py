import smartpy as sp
PROPOSAL_ACCEPTED=sp.nat(0)
STARTING_STAGE=sp.nat(1)
ONGOING_STAGE=sp.nat(2)
COMPLETED_STAGE=sp.nat(3)
class PatentIndia(sp.Contract):
    def __init__(self):
        self.init(
            base_fees= sp.mutez(200),

            ideaID=sp.nat(1),
            admin= sp.address("tz1"),
            
            # Idea= sp.record(
            # index=sp.TNat, 
            # owner=sp.TAddress,
            # projectName=sp.TString,
            # description=sp.TString,
            # imageUrl=sp.TString,
            # stage=sp.TNat,                
            # validity=sp.TTimestamp
            # ),
            
            ideas= sp.big_map(l={},tkey=sp.TNat,tvalue=sp.TRecord( 
            owner=sp.TAddress,
            projectName=sp.TString,
            description=sp.TString,
            imageUrl=sp.TString,
            stage=sp.TNat,                
            validity=sp.TTimestamp)),
            
            owner_to_ideas=sp.big_map(tkey=sp.TAddress,tvalue=sp.TList(sp.TNat)),
        )


    @sp.entry_point
    def patentYourIdea(self,params):
        sp.verify(sp.amount>=self.data.base_fees,"Insufficient Balance to patent your idea")
        # Validity for one year
        valid= sp.now.add_days(365)
        self.data.ideas[self.data.ideaID]=sp.record(owner=sp.sender,projectName=params.name,description=params.desc,imageUrl=params.imgurl,stage=0,validity=valid)
        
       
        # record entries in big maps 
        sp.if self.data.owner_to_ideas.contains(sp.sender):
            self.data.owner_to_ideas[sp.sender].push(self.data.ideaID)
        sp.else:
            self.data.owner_to_ideas[sp.sender]=sp.list([self.data.ideaID],t=sp.TNat)
        self.data.ideaID=self.data.ideaID+1
        
    @sp.entry_point
    def updatePatentStage(self,params):
        sp.verify(params.id<=self.data.ideaID,"Record is not exist")
        idea= self.data.ideas[params.id]
        sp.verify(sp.sender==idea.owner,"You are not the owner of this proposal or idea")
        
        sp.if params._stage==1:
            idea.stage= sp.as_nat(1)
        sp.if params._stage==2:
            idea.stage= sp.as_nat(2)
        sp.if params._stage==3:
            idea.stage= sp.as_nat(3)   
        sp.else :
            idea.stage= sp.as_nat(0) 

        sp.if params.name != "":
            idea.projectName=params.name

        sp.if params.desc!="":
            idea.description=params.desc

        sp.if params.imgurl != "":
            idea.imageUrl=params.imgurl
  
        
    @sp.entry_point
    def deleteYourPatentIdea(self,params):
        sp.verify(params.id<=self.data.ideaID,"Record is not exist")
        idea= self.data.ideas[params.id]
        sp.verify(sp.sender==idea.owner,"You are not the owner of this proposal or idea")
        sp.verify(idea.validity>sp.now,"Validity still valid you can not remove patent from records")
        del self.data.ideas[params.id]

    @sp.entry_point
    def withdrawlMoney(self):
        sp.verify(self.data.admin==sp.sender,"You are not admin")
        sp.send(sp.sender,sp.balance)


@sp.add_test(name="PatentIndia")
def test():
    scenerio=sp.test_scenario()
    patent=PatentIndia()
    scenerio+=patent
    alice= sp.test_account("alice")
    bob=sp.test_account("bob")
    dog=sp.test_account("dog")
    cat=sp.test_account("cat")
    admin=sp.test_account("tz1")
    scenerio+=patent.patentYourIdea(name="Meta Borrow",desc="Tokenised your real estate",imgurl="https://hello.com").run(sender=alice,amount=sp.mutez(200))
    scenerio+=patent.patentYourIdea(name="Peer to Peer Bet",desc="Peer Bet System",imgurl="https://zello.com").run(sender=bob,amount=sp.mutez(200))
    scenerio+=patent.patentYourIdea(name="Block Farm",desc="Supply chain",imgurl="https://zello.com").run(sender=dog,amount=sp.mutez(200))
    scenerio+=patent.patentYourIdea(name="Movie Tickets",desc="Decentralised Movie ticket system",imgurl="https://zello.com").run(sender=cat,amount=sp.mutez(200))
    scenerio+=patent.updatePatentStage(name="Borrow-Defi-Meta",id=1,_stage=0,desc="",imgurl="").run(sender=alice)
    scenerio+=patent.deleteYourPatentIdea(id=2).run(sender=bob)
    scenerio+=patent.withdrawlMoney().run(sender=admin)
    







        
        
        