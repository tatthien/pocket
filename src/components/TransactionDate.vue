<template>
  <li class="mb-4 shadow bg-white rounded">
    <header class="flex justify-between px-4 pt-4 pb-4 border-b border-grey-lighter">
      <time class="block font-semibold" v-text="date"></time>
      <span class="font-semibold">{{ total | money }}</span>
    </header>
    <ul class="list-reset">
      <li v-for="(item) in sortedTransaction" :key="item.id" class="flex justify-between px-4 pt-3 pb-3 cursor-pointer hover:bg-grey-lighter">
        <div>
          <span v-text="item.note"></span>
          <div>
            <a href="" class="text-sm mr-2 no-underline text-blue hover:underline">#Ăn uống</a>
            <a href="" class="text-sm mr-2 no-underline text-blue hover:underline">#tet19</a>
          </div>
        </div>
        <span class="text-red">{{ item.amount | money }}</span>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    date: {
      type: String
    },
    transaction: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    total () {
      return this.transaction.reduce((acc, curr) => acc + curr.amount, 0)
    },
    sortedTransaction () {
      return this.transaction.sort((a, b) => {
        return b.amount - a.amount
      })
    }
  },
  filters: {
    money (amount) {
      let formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      })
      amount = amount / 100
      return formatter.format(amount)
    }
  }
}
</script>
