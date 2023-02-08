import smartpy as sp

class Lottery(sp.Contract):
    def __init__(self):
        #storage
        self.init(
            players = sp.map(l={},tkey = sp.TNat, tvalue = sp.TAddress),
            ticket_cost = sp.tez(1),
            ticket_available = sp.nat(5),
            max_tickets = sp.nat(5),
        )
    @sp.entry_point #to buy ticket
    def buy_ticket(self):
        sp.verify(self.data.ticket_available > 0, "NO TICKET AVAILABLE")
        sp.verify(sp.amount >= self.data.ticket_cost, "INVALID AMOUNT")
    
        #storage changes
        self.data.players[sp.len(self.data.players)] = sp.sender 
        self.data.ticket_available = sp.as_nat(self.data.ticket_available - 1)
    
        #return extra tez
        extra_amt = sp.amount - self.data.ticket_cost
        sp.if extra_amt > sp.tez(0):
            sp.send(sp.sender,extra_amt)
    
    @sp.entry_point
    def end_game(self):
        # sp.verify(sp.sender == self.data.operator, "NOT AUTHORIZED")
        sp.verify(self.data.ticket_available == 0, "GAME IS STILL ON")
        #generate winning index
        win_index = sp.as_nat(sp.now - sp.timestamp(0)) % self.data.max_tickets
        win_address = self.data.players[win_index]
    
        #send reward
        sp.send(win_address,sp.balance)
    
        #reset the game
        self.data.players = {}
        self.data.ticket_available = self.data.max_tickets
    
    #test_scenario
@sp.add_test(name = "main")
def test():
    scenario = sp.test_scenario()

    #test accounts
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    jon = sp.test_account("jon")
    ali = sp.test_account("ali")
    mice = sp.test_account("mice")

    #connect instance
    lottery = Lottery()
    scenario += lottery

    #buy_ticket
    scenario += lottery.buy_ticket().run(amount=sp.tez(1),sender = alice)
    scenario += lottery.buy_ticket().run(amount=sp.tez(3),sender = mice)
    scenario += lottery.buy_ticket().run(amount=sp.tez(1),sender = alice)
    
    