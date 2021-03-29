import { createContext, useContext, useEffect, useState } from 'react'
import {
  TransactionRecord,
  TransactionProviderProps,
  Transaction,
  TransactionsContextData
} from '../@types/custom'
import { api } from '../services/api'

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionRecord[]>([])

  useEffect(() => {
    api
      .get('/transactions')
      .then(res => {
        setTransactions(res.data.transactions)
      })
      .catch(err => err)
  }, [])

  async function createTransaction(transactionData: Transaction) {
    const response = await api.post('/transactions', {
      ...transactionData,
      createdAt: new Date()
    })
    const { transaction } = response.data
    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}
