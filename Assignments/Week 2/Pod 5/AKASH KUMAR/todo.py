import smartpy as sp

class Todolist(sp.Contract):
    def __init__(self):
        self.init(
            time = sp.list([]),
            person = sp.list([]),
            area_of_interest = sp.list([]),
            info = sp.list([]) 
        )

    @sp.entry_point
    def add_entry(self, params):
        self.data.time.push(sp.now)
        self.data.person.push(params.p)
        self.data.area_of_interest.push(params.a)
        self.data.info.push(params.i)

# Tests
@sp.add_test(name = "Todolist")
def test1():
    scenario = sp.test_scenario()
    scenario.h1("Welcome to Todo Notebook")
    c1 = Todolist()
    scenario += c1
    scenario += c1.add_entry(p = 'Akash', a = 'Blockchain Development', i = 'Hello there Myself Akash a Blockchain Developer.')
    scenario += c1.add_entry(p = 'Sanjeev', a = 'Competitive Coding', i = 'Hello there Myself Sanjeev and i love doing CP.')
    scenario += c1.add_entry(p = 'Tejash', a = 'DSA', i = 'Hello there Myself Tejash and i love doing DSA.')
    scenario += c1.add_entry(p = 'Bhashkar', a = 'Frontend Development', i = 'Hello there Myself Bhashkar and i love doing Frontend Web Development.')
    scenario += c1.add_entry(p = 'Vishal', a = 'Programming', i = 'Hello there Myself Vishal and i love doing Programming in C++.')