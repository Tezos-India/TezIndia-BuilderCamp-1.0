import smartpy as sp

class Stack(sp.Contract):
    def __init__(self):
        self.init(top = -1,
                  saved = {})

    @sp.entry_point
    def pop(self):
        sp.verify(self.data.top > -1)
        del self.data.saved[self.data.top]
        self.data.top -= 1

    @sp.entry_point
    def push(self, element):
        self.data.top += 1
        self.data.saved[self.data.top] = element

    def head(self):
        return self.data.saved[self.data.top]

if "templates" not in __name__:
    @sp.add_test(name = "Stack")
    def test():
        scenario = sp.test_scenario()
        scenario.h1("Stack Contract Implementation")
        c1 = Stack()
        scenario += c1
        c1.push(4)
        c1.push(5)
        c1.push(6)
        c1.push(7)
        c1.pop()