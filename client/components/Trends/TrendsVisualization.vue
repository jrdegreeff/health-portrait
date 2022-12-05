<!-- Component for building a graph -->

<template>
  <div style="width: 800px;"><canvas id="acquisitions"></canvas></div>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
  name: 'TrendsVisualization',
  mounted() {
    this.chart();
  },
  methods: {
    async chart() {
      const happiness = [
        { date: '2022/11/01', scale: 1 },
        { date: '2022/11/02', scale: 2 },
        { date: '2022/11/03', scale: 4 },
        { date: '2022/11/04', scale: 3 },
        { date: '2022/11/05', scale: 5 },
      ];
      const pain = [
        { date: '2022/11/01', scale: 5 },
        { date: '2022/11/02', scale: 4 },
        { date: '2022/11/03', scale: 2 },
        { date: '2022/11/04', scale: 3 },
        { date: '2022/11/05', scale: 1 },
      ];
      const cognition = [
        { date: '2022/11/01', scale: 3 },
        { date: '2022/11/02', scale: 4 },
        { date: '2022/11/03', scale: 5 },
        { date: '2022/11/04', scale: 4 },
        { date: '2022/11/05', scale: 5 },
      ];

      new Chart(
        document.getElementById('acquisitions'),
        {
          type: 'line',
          options: {
            // animation: false,
            plugins: {
              legend: {
                display: true
              },
              tooltip: {
                enabled: false
              }
            }
          },
          data: {
            labels: happiness.map(row => row.date),
            datasets: [
              {
                label: 'Cognition',
                data: cognition.map(row => row.scale)
              },
              {
                label: 'Pain',
                data: pain.map(row => row.scale)
              },
              {
                label: 'Happiness',
                data: happiness.map(row => row.scale)
              }
            ]
          }
        }
      )
    }
  }
};
</script>
