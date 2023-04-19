import smartpy as sp


class Store(sp.Contract):
    
    def __init__(self, value):
        self.init(storedValue=sp.to_int(value))

    @sp.entry_point
    def subtraction(self,params):
        self.data.storedValue -= params.a

    @sp.entry_point
    def addition(self, params):
        self.data.storedValue += params.a

    @sp.entry_point
    def multiplication(self, params):
        self.data.storedValue *= params.value
        
    @sp.entrypoint
    def square(self, params):
        self.data.storedValue += params.a * params.a
        
    @sp.entry_point
    def update(self, params):
        self.data.storedValue = params.value

@sp.add_test(name="Storage Test")
def test():

    Test1 = Store(15)
    scenario = sp.test_scenario()

    scenario += Test1

    scenario += Test1.update(value=55)
    scenario += Test1.addition(a=61)
    scenario += Test1.subtraction(a=10)
    scenario += Test1.multiplication(value=2)
    scenario += Test1.square(a=9)
