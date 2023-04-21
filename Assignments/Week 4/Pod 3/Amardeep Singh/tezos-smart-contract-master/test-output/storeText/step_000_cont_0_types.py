import smartpy as sp

tstorage = sp.TRecord(text = sp.TString).layout("text")
tparameter = sp.TVariant(append = sp.TRecord(text = sp.TString).layout("text"), replace = sp.TRecord(text = sp.TString).layout("text")).layout(("append", "replace"))
tprivates = { }
tviews = { }
