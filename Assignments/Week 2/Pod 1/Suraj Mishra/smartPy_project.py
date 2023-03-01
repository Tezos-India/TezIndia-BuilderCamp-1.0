import smartpy as sp

class Lottery(sp.Contract):
    def __init__(self):
        self.init(
            players = sp.map(l={},tkey = sp.TNat, tvalue = sp.TAddress),
            ticket_cost = sp.tez(1),
            ticket_available = sp.nat(5),
            max_ticket = sp.nat(5),
        )

    @sp.entry_point
    def buy_ticket(self):
        sp.verify(self.data.ticket_available >0 , "NO Tickets remaining")
        sp.verify(sp.amount >= self.data.ticket_cost," INvalid Amount")

        self.data.players[sp.len(self.data.players)] = sp.sender
        self.data.ticket_available=sp.as_nat(self.data.ticket_available-1)

        extra = sp.amount - self.data.ticket_cost

        sp.if extra > sp.tez(0):
            sp.send(sp.sender,extra)


    @sp.entry_point
    def end_game(self):
        sp.verify(self.data.ticket_available == 0 , "Game is still on")
        #sp.verify(sp.sender == self.data.operator, "Not authorised to run this func")
        winner = sp.as_nat(sp.now-sp.timestamp(0))% self.data.max_ticket
        winnerAdd = self.data.players[winner]

        sp.send(winnerAdd,sp.balance)

        self.data.players = {}
        self.data.ticket_available = self.data.max_ticket


@sp.add_test(name = "main")
def test():
    scenario = sp.test_scenario()

    player1 = sp.test_account("player1")
    player2 = sp.test_account("player2")
    player3 = sp.test_account("player3")
    player4 = sp.test_account("player4")
    player5 = sp.test_account("player5")

    lottery = Lottery()
    scenario+=lottery

    scenario+= lottery.buy_ticket().run(amount = sp.tez(1),sender = player1)
    scenario+= lottery.buy_ticket().run(amount = sp.tez(1),sender = player2)
    scenario+= lottery.buy_ticket().run(amount = sp.tez(1),sender = player3)
    scenario+= lottery.buy_ticket().run(amount = sp.tez(1),sender = player5)
    scenario+= lottery.buy_ticket().run(amount = sp.tez(1),sender = player4)
    scenario+= lottery.end_game().run(now = sp.timestamp(45512))
