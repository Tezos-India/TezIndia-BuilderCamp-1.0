import smartpy as sp

class Lottery(sp.Contract):
    #storage
    def __init__(self):
        self.init(
            players=sp.map(l={},tkey=sp.TNat,tvalue=sp.TAddress),
            ticket_cost=sp.tez(1),
            tickets_available=sp.nat(5),
            max_tickets = sp.nat(5),
            remaining = sp.tez(0),
            operator=sp.test_account("orc").address,
        )

    @sp.entry_point
    def buy_ticket(self , params):
        sp.set_type(params, sp.TRecord(num_of_tickets=sp.TNat))
        sp.verify(self.data.tickets_available > 0,"No more tickets available")
        sp.verify(sp.amount >= self.data.ticket_cost , "Insufficient amount of tokens")
        self.data.remaining=sp.amount
        sp.for i in sp.range(1,params.num_of_tickets + 1):
            self.data.players[sp.len(self.data.players)] = sp.sender
            self.data.remaining=self.data.remaining-self.data.ticket_cost
        
        self.data.tickets_available = sp.as_nat(self.data.tickets_available - params.num_of_tickets)

        extra_amount = self.data.remaining
        sp.if extra_amount > sp.tez(0):
            sp.send(sp.sender,extra_amount)


    @sp.entry_point
    def end_game(self,random_num):
        sp.set_type(random_num,sp.TNat)
        sp.verify(self.data.tickets_available == 0 , "Game is still on")
        sp.verify(sp.sender == self.data.operator , "not authed")
        
        #winner_index = sp.as_nat(sp.now - sp.timestamp(0)) % self.data.max_tickets
        winner_address = self.data.players[random_num]

        sp.send(winner_address,sp.balance)

        self.data.players = {}
        self.data.tickets_available=self.data.max_tickets

@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()

    a=sp.test_account("a")
    b=sp.test_account("b")
    c=sp.test_account("c")
    m=sp.test_account("m")
    d=sp.test_account("d")
    m=sp.test_account("i")
    orc=sp.test_account("orc")
    

    lottery=Lottery()
    scenario += lottery
    
    scenario += lottery.buy_ticket( num_of_tickets= 1 ).run(
        amount=sp.tez(40) , sender=a
    )
    scenario += lottery.buy_ticket( num_of_tickets= 2 ).run(
        amount=sp.tez(2) , sender=b
    )
    scenario += lottery.buy_ticket( num_of_tickets= 2 ).run(
        amount=sp.tez(2) , sender=c
    )

    scenario += lottery.end_game(3).run(sender = orc, now = sp.timestamp(20))
    
