export interface Transaction {
  title: string
  amount: number
  type: string
  category: string
}

export interface TransactionRecord extends Transaction {
  id: number
  createdAt: Date
}

export type TransactionsContextData = {
  transactions: TransactionRecord[]
  createTransaction: (transaction: Transaction) => Promise<void>
}

export type TransactionProviderProps = {
  children: React.ReactNode
}
