import React from 'react'
import ReactDOM from 'react-dom'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Website',
          amount: 6000,
          type: 'deposit',
          category: 'Freela',
          createdAt: new Date('2021-03-20 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          amount: 1500,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2021-03-10 09:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
