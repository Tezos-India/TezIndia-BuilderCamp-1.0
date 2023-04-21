import smartpy as sp

class Lottery(sp.Contract):
    def __init__(self):
        self.init(
            players=sp.map(l={}, tkey=sp.TNat, tvalue=sp.TAddress),
            ticket_cost= sp.tez(1),
            tickets_available= sp.nat(5),
            max_tickets=sp.nat(5)
            
        )

    @sp.entry_point
    def buy_ticket(self):

        #assertions
        sp.verify(self.data.tickets_available >0, "Not tickets available")
        sp.verify(sp.amount >=self.data.ticket_cost,"Invalid amount")

        #storage changes
        self.data.players[sp.len(self.data.players)]=sp.sender
        self.data.tickets_available = sp.as_nat(self.data.tickets_available - 1)

        #return extra tez 
        extra_tez = sp.amount - self.data.ticket_cost
        sp.if sp.amount - self.data.ticket_cost > sp.tez(0):
            sp.send(sp.sender, extra_tez)

    @sp.entry_point
    def end_game(self):
       
        #assertions
        sp.verify(self.data.tickets_available == 0,"Tickets are available")
        
        #selecting a winner
        winner = sp.as_nat(sp.now - sp.timestamp(0)) % self.data.max_tickets
        winner_address = self.data.players[winner]
        
        #sending winning amount
        sp.send(winner_address, sp.balance)

        #reset game
        self.data.players={}
        self.data.tickets_available = self.data.max_tickets

@sp.add_test(name= "main")
def test():
    scenario = sp.test_scenario()

    #test acconts
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    polygon = sp.test_account("polygon")
    polkadot = sp.test_account("polkadot")
    tezos = sp.test_account("tezos")
    ethereum = sp.test_account("ethereum")
    admin = sp.test_account("admin")

    #instance
    lot = Lottery()
    scenario += lot
    
    #buy tickets
    scenario += lot.buy_ticket().run(
        amount= sp.tez(12),
        sender = polkadot
    )

    scenario += lot.buy_ticket().run(
        amount= sp.tez(2),
        sender = alice
    )

    scenario += lot.buy_ticket().run(
        amount= sp.tez(3),
        sender = bob
    )

    scenario += lot.buy_ticket().run(
        amount= sp.tez(4),
        sender = polygon
    )

    scenario += lot.buy_ticket().run(
        amount= sp.tez(9),
        sender = tezos
    )

    scenario += lot.buy_ticket().run(
        amount= sp.tez(9),
        sender = ethereum,
        valid=False
    )

    # end _game
    scenario += lot.end_game().run(
        now = sp.timestamp(3)
    )
    
sp.add_compilation_target("test", Lottery())