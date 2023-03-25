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

    def test():
        # create 3 test accounts
        owner1 = sp.test_account("Owner 1")
        owner2 = sp.test_account("Owner 2")
        owner3 = sp.test_account("Owner 3")
    
        # deploy contract with 2 out of 3 owners required for approval
        multi_sig_wallet = MultiSigWallet([owner1.address, owner2.address, owner3.address], 2)
        scenario = sp.test_scenario()
        scenario += multi_sig_wallet
    
        # deposit funds into the contract
        scenario += multi_sig_wallet.deposit().run(sender=owner1, amount=sp.mutez(100))
        scenario += multi_sig_wallet.deposit().run(sender=owner2, amount=sp.mutez(50))
        scenario += multi_sig_wallet.deposit().run(sender=owner3, amount=sp.mutez(25))
    
        # withdraw funds from the contract
        scenario += multi_sig_wallet.withdraw(sp.mutez(25)).run(sender=owner1)
    
        # transfer funds to another address
        recipient = sp.test_account("Recipient").address
        scenario += multi_sig_wallet.transfer(recipient, sp.mutez(50)).run(sender=owner2)
    
        # create transaction that requires approval
        tx_hash = sp.bytes("test")
        multi_sig_wallet.data.destination = recipient
        multi_sig_wallet.data.amount = sp.mutez(25)
        multi_sig_wallet.data.approvals = {}
    
        # approve transaction with one owner
        scenario += multi_sig_wallet.approve(tx_hash).run(sender=owner1)
    
        # try to execute transaction with only one approval
        scenario += multi_sig_wallet.approve(tx_hash).run(sender=owner2)
        scenario.show(multi_sig_wallet.balance_of(owner1.address))
        scenario.show(multi_sig_wallet.balance_of(owner2.address))
        scenario.show(multi_sig_wallet.balance_of(owner3.address))
    
        # approve transaction with second owner
        scenario += multi_sig_wallet.approve(tx_hash).run(sender=owner3)
        scenario.show(multi_sig_wallet.balance_of(owner1.address))
        scenario.show(multi_sig_wallet.balance_of(owner2.address))
        scenario.show(multi_sig_wallet.balance_of(owner3.address))
    
        # reset approvals for all transactions
        scenario += multi_sig_wallet.reset_approvals().run(sender=owner1)
        scenario.show(multi_sig_wallet.data.approvals)

    # run test scenario
    test()