import smartpy as sp
class CRUD(sp.Contract):
    def __init__(self):
        self.init(
            messages=sp.map(l={}, tkey=sp.TNat, tvalue=sp.TString)
        )



    #C-Create Operation
    #R-Read Operation
    #U-Update Operation
    #D-Delete Operation
    @sp.entry_point
    def createTerm(self,value=sp.TString):
        self.data.messages[sp.len(self.data.messages)]=value

    # @sp.entry_point
    @sp.private_lambda 
    def readTerm(self,id=sp.TNat):
        sp.verify(id<=sp.len(self.data.messages),"Data is not exist")
        sp.result(self.data.messages[id])
        

    @sp.entry_point
    def updateTerm(self,id=sp.TNat,updateTermData=sp.TString):
        sp.verify(id<=sp.len(self.data.messages),"Data is not exist which has to be update")
        self.data.messages[id]=updateTermData     

    @sp.entry_point
    def deleteTerm(self,id=sp.TNat):
        sp.verify(id<=sp.len(self.data.messages),"Data is not exist which has to be delete ")
        del self.data.messages[id]    
        
@sp.add_test(name="CRUD")
def test():
    scenerio= sp.test_scenario()
    crud= CRUD()
    scenerio+=crud
    #test functions 
    scenerio+=crud.createTerm("Hello World")
    scenerio+=crud.createTerm("Hello India")
    scenerio+=crud.createTerm("Hello Argentina")
    scenerio+=crud.createTerm("Hello Australia")
    scenerio+=crud.createTerm("Hello Africa")

    scenerio+=crud.updateTerm(id=sp.nat(2),updateTermData="America")
    
    scenerio+=crud.deleteTerm(0)
    scenerio+=crud.updateTerm(id=sp.nat(0),updateTermData="Mumbai")

    # scenerio+=crud.readTerm()
    
        