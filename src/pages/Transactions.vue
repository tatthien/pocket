<template>
  <div>
    <div class="mb-8 shadow rounded p-4 bg-white">
      <h2 class="text-2xl font-normal mb-6">Add transaction</h2>

      <form @submit.prevent="addTransaction">
        <div class="flex justify-between mb-2">
          <input type="number" placeholder="20000" class="rounded border w-1/2 p-2 mr-2" min="0" v-model="amount" required>
          <datepicker v-model="date" input-class="rounded border w-full p-2" required format="d-MM-yyyy"></datepicker>
        </div>
        <div class="flex mb-2">
          <input type="text" placeholder="Breakfast" class="rounded border p-2 flex-1" v-model="note" required>
        </div>
        <button class="text-white p-2 px-4 bg-blue hover:bg-blue-light rounded ladda-button submit-button" data-style="slide-right">
          <span class="ladda-label">Add</span>
        </button>
      </form>
    </div>

    <ul class="list-reset">
      <TransactionDate v-for="(transaction, date) in transactions" :key="date" :date="date" :transaction="transaction" />
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import * as ladda from 'ladda'
import TransactionDate from '@/components/TransactionDate.vue'
import Datepicker from 'vuejs-datepicker'
export default {
  components: {
    TransactionDate,
    Datepicker
  },
  data () {
    return {
      amount: '',
      date: new Date(),
      note: '',
      transactions: {}
    }
  },
  created () {
    this.getTransactions()
  },
  methods: {
    getTransactions () {
      axios.get('/api/transactions', {})
      .then((response) => {
        this.transactions = response.data.data
      })
    },
    addTransaction () {
      let l = ladda.create(document.querySelector('.submit-button'))

      if (l.isLoading()) return

      l.start()

      axios.post('/api/transactions', {
        date: this.date,
        amount: this.amount,
        note: this.note
      }).then(() => {
        this.getTransactions()
        this.amount = ''
        this.note = ''
        this.date = ''
        l.stop()
      }).catch((err) => {
        l.stop()
      })
    }
  }
}
</script>
