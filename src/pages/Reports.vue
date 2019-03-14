<template>
  <div class="rounded p-4 bg-white shadow">
    <h2 class="text-2xl font-normal mb-6">Reports</h2>

    <select class="rounded border p-2" v-model="range">
      <option value="7">Last 7 days</option>
      <option value="30">Last 30 days</option>
    </select>

    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import axios from 'axios'
export default {
  data () {
    return {
      range: 7
    }
  },
  mounted () {
    this.getReports()
  },
  watch: {
    range (newVal) {
      this.getReports()
    }
  },
  methods: {
    getReports () {
      axios.get('/api/reports', {
        params: {
          range: this.range
        }
      }).then((res) => {
        this.drawChart(res.data.labels, res.data.values)
      })
    },
    drawChart (labels, values) {
      let ctx = document.getElementById('myChart').getContext('2d');
      let chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
              labels: labels,
              datasets: [{
                label: "Spends",
                backgroundColor: '#3490dc',
                borderColor: '#3490dc',
                data: values,
                lineTension: 0
              }]
          },

          // Configuration options go here
          options: {
          }
      })
    }
  }
}
</script>
