# Store Value - Example for illustrative purposes only.

import smartpy as sp

class StoreText(sp.Contract):
    def __init__(self, value):
        self.init(text = value)

    @sp.entry_point
    def replace(self, params):
        self.data.text = params.text

    @sp.entry_point
    def append(self, params):
        self.data.text += params.text

@sp.add_test(name = "StoreText")
def test():
  scenario = sp.test_scenario()
  contract = StoreText("Hello")
  scenario += contract

  scenario.verify(contract.data.text == "Hello")

  contract.replace(text = "Hi")
  contract.append(text = ", there!")
  scenario.verify(contract.data.text == "Hi, there!")

sp.add_compilation_target("storeText", StoreText("Hello, there"))
