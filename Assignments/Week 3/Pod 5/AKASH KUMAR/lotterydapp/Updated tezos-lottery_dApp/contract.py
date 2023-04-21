import smartpy as sp

class Lottery(sp.Contract):
    def __init__(self):
        self.init(
            players = sp.map(l={}, tkey=sp.TNat, tvalue=sp.TAddress),
            ticket_cost = sp.tez(1),
            tickets_available = sp.nat(5),
            max_tickets = sp.nat(5),
        )

    @sp.entry_point
    def buy_ticket(self):

        # assertions
        sp.verify(self.data.tickets_available > 0, "NO TICKETS AVAILABLE")
        sp.verify(sp.amount >= self.data.ticket_cost, "INVALID AMOUNT")

        # Storage updates
        self.data.players[sp.len(self.data.players)] = sp.sender
        self.data.tickets_available = sp.as_nat(self.data.tickets_available - 1)

        # Return extra tez balance to the sender
        extra_balance = sp.amount - self.data.ticket_cost
        sp.if extra_balance > sp.mutez(0):
            sp.send(sp.sender, extra_balance)

    @sp.entry_point
    def end_game(self):

        # assertion
        sp.verify(self.data.tickets_available == 0, "GAME IS YET TO END")

        # Pick a winner by generating  a random number
        winner_id = sp.as_nat(sp.now - sp.timestamp(0)) % self.data.max_tickets
        winner_address = self.data.players[winner_id]

        # Send the reward to the winner
        sp.send(winner_address, sp.balance)

        # Reset the game
        self.data.players = {}
        self.data.tickets_available = self.data.max_tickets

@sp.add_test(name = "main")
def test():
    scenario = sp.test_scenario()

    # Test accounts
    admin = sp.test_account("admin")
    akash = sp.test_account("akash")
    sanjeev = sp.test_account("sanjeev")
    tejash = sp.test_account("tejash")
    vishal = sp.test_account("vishal")
    bhashkar = sp.test_account("bhashkar")
   
    

    # Contract instance
    lottery = Lottery()
    scenario += lottery

    # buy_ticket
    scenario.h2("buy_ticket (valid test)")
    scenario += lottery.buy_ticket().run(amount = sp.tez(1), sender = akash)
    scenario += lottery.buy_ticket().run(amount = sp.tez(5), sender = sanjeev)
    scenario += lottery.buy_ticket().run(amount = sp.tez(7), sender = tejash)
    scenario += lottery.buy_ticket().run(amount = sp.tez(3), sender = vishal)
    scenario += lottery.buy_ticket().run(amount = sp.tez(6), sender = bhashkar)
    

    scenario.h2("buy_ticket (failure test)")
    scenario += lottery.buy_ticket().run(amount = sp.tez(1), sender = akash, valid = False)

    # end_game
    scenario.h2("end_game (valid test)")
    scenario += lottery.end_game().run(sender = admin, now = sp.timestamp(25))
