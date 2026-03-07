class BankAccount {
    constructor(balance = 0) {
      this.balance = 0
      this.transactions = []
  
    }
    deposit(amount) {
      if (amount > 0) {
        this.transactions.push({ type: 'deposit', amount: amount })
        this.balance += amount;
        return `Successfully deposited $${amount}. New balance: $${this.balance}`;
      } return `Deposit amount must be greater than zero.`
    }
    withdraw(amount) {
      if (amount > 0 && amount < this.balance) {
        this.transactions.push({ type: 'withdraw', amount: amount })
        this.balance -= amount
        return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
      } return `Insufficient balance or invalid amount.`
    }
    checkBalance() {
      return `Current balance: $${this.balance}`
    }
    listAllDeposits() {
      let str = 'Deposits: ';
      let arr = [];
      for (const transaction of this.transactions) {
        if (transaction.type === 'deposit') arr.push(transaction.amount);
      }
      return str += arr.join(',');
    }
  
    listAllWithdrawals() {
      let str = 'Withdrawals: ';
      let arr = [];
      for (const transaction of this.transactions) {
        if (transaction.type === 'withdraw') arr.push(transaction.amount);
      }
      return str += arr.join(',');
    }
  }
  const myAccount = new BankAccount()
  
  console.log(myAccount.deposit(200))
  console.log(myAccount.deposit(200))
  console.log(myAccount.deposit(200))
  console.log(myAccount.deposit(200))
  console.log(myAccount.withdraw(200))
  console.log(myAccount.withdraw(200))
  console.log(myAccount.checkBalance())
  console.log(myAccount.listAllDeposits())
  console.log(myAccount.listAllWithdrawals())
  