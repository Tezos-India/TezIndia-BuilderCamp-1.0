import smartpy as sp

class MultiSigWallet(sp.Contract):
    def __init__(self, owners, num_required):
        self.init(
            owners=owners, # a list of tz addresses for the owners
            num_required=num_required, # the minimum number of approvals required
            balances={owner: sp.mutez(0) for owner in owners} # initialize all balances to 0
        )
        
    @sp.entry_point
    def deposit(self):
        # allow owners to deposit funds into the contract
        sp.verify(sp.sender in self.data.owners, message="sender must be an owner")
        self.data.balances[sp.sender] += sp.amount
        
    @sp.entry_point
    def withdraw(self, amount):
        # allow an owner to withdraw funds from the contract
        sp.verify(self.data.balances[sp.sender] >= amount, message="not enough funds")
        sp.verify(sp.sender in self.data.owners, message="sender must be an owner")
        self.data.balances[sp.sender] -= amount
        sp.transfer(sp.sender, amount)
        
    @sp.entry_point
    def transfer(self, recipient, amount):
        # allow an owner to transfer funds to another address
        sp.verify(self.data.balances[sp.sender] >= amount, message="not enough funds")
        sp.verify(sp.sender in self.data.owners, message="sender must be an owner")
        self.data.balances[sp.sender] -= amount
        sp.transfer(recipient, amount)
        
    @sp.entry_point
    def approve(self, tx_hash):
        # allow owners to approve a transaction
        sp.verify(sp.sender in self.data.owners, message="sender must be an owner")
        sp.verify(self.data.approvals.get(tx_hash, 0) == 0, message="transaction already approved")
        self.data.approvals[tx_hash] = 1
        
        if sum(self.data.approvals.values()) >= self.data.num_required:
            # if enough approvals have been received, execute the transaction
            sp.transfer(self.data.destination, self.data.amount)
            self.reset_approvals()
        
    @sp.entry_point
    def reset_approvals(self):
        # reset the approvals for all transactions
        sp.verify(sp.sender in self.data.owners, message="sender must be an owner")
        self.data.approvals = {}