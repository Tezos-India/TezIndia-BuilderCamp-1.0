import smartpy as sp

class Dexchange(sp.Contract):
    def __init__(self):
        self.init(
            tokens = sp.big_map(),
            balances = sp.big_map(),
            orders = sp.big_map()
        )

    @sp.entry_point
    def add_token(self, params):
        self.data.tokens[params.token_id] = sp.record(
            name = sp.TNat(params.name),
            symbol = sp.TNat(params.symbol),
            decimals = params.decimals,
            total_supply = params.total_supply,
            owner = sp.sender
        )

    @sp.entry_point
    def create_order(self, params):
        token = self.data.tokens[params.token_id]
        sp.verify(token is not sp.none, message = "Token not found")
        sp.verify(params.amount > 0, message = "Amount must be greater than 0")
        sp.verify(params.price > 0, message = "Price must be greater than 0")

        order_id = sp.sha256(sp.pack((sp.sender, params.token_id, params.price)))
        self.data.orders[order_id] = sp.record(
            token_id = params.token_id,
            amount = params.amount,
            price = params.price,
            creator = sp.sender
        )

    @sp.entry_point
    def cancel_order(self, params):
        order_id = sp.sha256(sp.pack((params.creator, params.token_id, params.price)))
        sp.verify(self.data.orders.contains(order_id), message = "Order not found")
        sp.verify(self.data.orders[order_id].creator == sp.sender, message = "Only order creator can cancel")

        del self.data.orders[order_id]

    @sp.entry_point
    def execute_trade(self, params):
        buy_order_id = sp.sha256(sp.pack((params.buyer, params.token_id, params.price)))
        sp.verify(self.data.orders.contains(buy_order_id), message = "Buy order not found")

        sell_order_id = sp.sha256(sp.pack((params.seller, params.token_id, params.price)))
        sp.verify(self.data.orders.contains(sell_order_id), message = "Sell order not found")

        buy_order = self.data.orders[buy_order_id]
        sell_order = self.data.orders[sell_order_id]

        sp.verify(buy_order.amount > 0, message = "Enter valid buy order amount")
        sp.verify(sell_order.amount > 0, message = "Enter valid sell order amount")

        trade_amount = sp.min(buy_order.amount, sell_order.amount)
        trade_value = trade_amount * sell_order.price

        sp.verify(params.value == trade_value, message = "Incorrect trading value")

        buy_order.creator.transfer(trade_value)
        sell_order.creator.transfer(trade_amount)

        buy_order.amount -= trade_amount
        sell_order.amount -= trade_amount

        sp.if buy_order.amount == 0:
            del self.data.orders[buy_order_id]
        sp.else:
            self.data.orders[buy_order_id] = buy_order

        sp.if sell_order.amount == 0:
            del self.data.orders[sell_order_id]
        sp.else:
            self.data.orders[sell_order_id] = sell_order

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

    dex = Dexchange()
    scenario += dex

    # Test add_token entry point
    token_id = 1
    params = {
        "token_id": token_id,
        "name": "Rafael",
        "symbol": "RAF",
        "decimals": 18,
        "total_supply": 3200000,
    }
    scenario += dex.add_token(params).run(sender=polygon)
    
    assert dex.data.tokens[token_id].name == params["name"]
    assert dex.data.tokens[token_id].symbol == params["symbol"]
    assert dex.data.tokens[token_id].decimals == params["decimals"]
    assert dex.data.tokens[token_id].total_supply == params["total_supply"]
    assert dex.data.tokens[token_id].owner == alice.address

    # Test create_order entry point
    params = {
        "token_id": token_id,
        "amount": 1000,
        "price": 1,
    }
    order_id = sp.sha256(sp.pack((alice.address, token_id, params["price"])))
    
    scenario += dex.create_order(params).run(sender=alice)
    
    assert dex.data.orders[order_id].token_id == params["token_id"]
    assert dex.data.orders[order_id].amount == params["amount"]
    assert dex.data.orders[order_id].price == params["price"]
    assert dex.data.orders[order_id].creator == alice.address

    # Test cancel_order entry point
    params = {
        "creator": alice.address,
        "token_id": token_id,
        "price": 1,
    }
    scenario += dex.cancel_order(params).run(sender=alice)
    assert not dex.data.orders.contains(order_id)

    # Test execute_trade entry point
    params = {
        "buyer": bob.address,
        "seller": alice.address,
        "token_id": token_id,
        "value": 1000,
        "price": 1,
    }
    buy_order_id = sp.sha256(sp.pack((params["buyer"], token_id, params["price"])))
    sell_order_id = sp.sha256(sp.pack((params["seller"], token_id, params["price"])))
    
    buy_order = {"token_id": token_id, "amount": 500, "price": 1, "creator": params["buyer"]}
    sell_order = {"token_id": token_id, "amount": 1000, "price": 1, "creator": params["seller"]}
    
    dex.data.orders[buy_order_id] = sp.record(**buy_order)
    dex.data.orders[sell_order_id] = sp.record(**sell_order)
    
    scenario += dex.execute_trade(params).run(sender=tezos)
    assert dex.data.orders[buy_order_id].amount == 0
    assert dex.data.orders[sell_order_id].amount == 500
    assert alice.balance == 1000
    assert bob.balance == 500