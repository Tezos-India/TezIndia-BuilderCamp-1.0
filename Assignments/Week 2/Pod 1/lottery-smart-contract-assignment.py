import smartpy as sp 

class Lottery(sp.Contract):
    def __init__(self):
        #storage
        self.init(
            players = sp.map(l={}, tkey=sp.TNat, tvalue=sp.TAddress),
            ticket_cost=sp.tez(1),
            tickets_available=sp.nat(5),
            max_tickets=sp.nat(5),
        )
        
    @sp.entry_point
    def buy_ticket(self):

        # assertions
        sp.verify(self.data.tickets_available > 0, "No Tickets available")
        sp.verify(sp.amount >= self.data.ticket_cost, "Invalid Amount")

        # storage changes
        self.data.players[sp.len(self.data.players)] = sp.sender
        self.data.tickets_available = sp.as_nat(self.data.tickets_available - 1)

        # return extra tez
        extra_amount = sp.amount - self.data.ticket_cost
        sp.if extra_amount > sp.tez(0):
            sp.send(sp.sender, extra_amount)

    @sp.entry_point
    def end_game(self):

        # assertion
        sp.verify(self.data.tickets_available == 0, "Game Is Still On")

        # generate a winning index
        winner_index = sp.as_nat(sp.now - sp.timestamp(0)) % self.data.max_tickets
        winner_address = self.data.players[winner_index]

        # send reward to the winner
        sp.send(winner_address, sp.balance)

        # reset the game
        self.data.players = {}
        self.data.tickets_available = self.data.max_tickets

@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()

    # test accounts
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    john = sp.test_account("john")
    mike = sp.test_account("mike")
    charles = sp.test_account("charles")

    # contract instance
    lottery = Lottery()
    scenario += lottery

    # Buy ticket
    scenario += lottery.buy_ticket().run(
       amount=sp.tez(1), sender=alice
    )
    scenario += lottery.buy_ticket().run(
       amount=sp.tez(1), sender=bob
    ) 
    scenario += lottery.buy_ticket().run(
       amount=sp.tez(1), sender=mike
    ) 
    scenario += lottery.buy_ticket().run(
       amount=sp.tez(1), sender=john
    ) 
    scenario += lottery.buy_ticket().run(
       amount=sp.tez(1), sender=charles
    )
    
    #  end game
    scenario += lottery.end_game().run(now = sp.timestamp(2))






