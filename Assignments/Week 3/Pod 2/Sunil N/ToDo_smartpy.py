# Contract deployed @ KT1ECtVmncwvU2h89yGuiBCTSz1qQJ5rrMXn
# Check out https://ghostnet.tzkt.io/KT1ECtVmncwvU2h89yGuiBCTSz1qQJ5rrMXn
import smartpy as sp

class TodoList(sp.Contract):
    def __init__(self):
        self.init(tasks = sp.map())

    @sp.entry_point
    def add_task(self, params):
        self.data.tasks[params.title] = False

    @sp.entry_point
    def complete_task(self, params):
        sp.verify(self.data.tasks.contains(params.title))
        self.data.tasks[params.title] = True

    @sp.entry_point
    def get_tasks(self):
        self.data.tasks

if "templates" not in __name__:
    @sp.add_test(name = "TodoList")
    def test():
        c1 = TodoList()
        scenario = sp.test_scenario()
        scenario.h1("Todo List")
        scenario += c1
        c1.add_task(title = "Task 1")
        c1.add_task(title = "Task 2")
        c1.add_task(title = "Task 3")
        c1.get_tasks()
        c1.complete_task(title="Task 2")
        c1.get_tasks()