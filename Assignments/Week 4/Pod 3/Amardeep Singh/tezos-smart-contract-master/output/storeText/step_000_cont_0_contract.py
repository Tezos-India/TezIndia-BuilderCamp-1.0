import smartpy as sp

class Contract(sp.Contract):
  def __init__(self):
    self.init_type(sp.TRecord(text = sp.TString).layout("text"))
    self.init(text = 'Hello, there')

  @sp.entry_point
  def append(self, params):
    self.data.text += params.text

  @sp.entry_point
  def replace(self, params):
    self.data.text = params.text

sp.add_compilation_target("test", Contract())