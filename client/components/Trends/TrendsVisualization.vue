<!-- Component for building a graph -->

<template>
  <!--  -->
  <div style="width: 800px;"><canvas id="graph"></canvas></div>
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
      // will add custom labels later
      // const happiness = [{entries.date, entries.scale} for entry in entries if entry.title === title && entries.condition === happiness]
      const happiness = [
        { date: '2022/11/01', scale: 1 },
        { date: '2022/11/02', scale: 2 },
        { date: '2022/11/03', scale: 4 },
        { date: '2022/11/04', scale: 3 },
        { date: '2022/11/05', scale: 5 },
      ];
      // const pain = [{entries.date, entries.scale} for entry in entries if entry.title === title && entries.condition === "pain"]
      const pain = [
        { date: '2022/11/01', scale: 5 },
        { date: '2022/11/02', scale: 4 },
        { date: '2022/11/03', scale: 2 },
        { date: '2022/11/04', scale: 3 },
        { date: '2022/11/05', scale: 1 },
      ];
      // const cognition = [{entries.date, entries.scale} for entry in entries if entry.title === title && entries.condition === "cognition"]
      const cognition = [
        { date: '2022/11/01', scale: 3 },
        { date: '2022/11/02', scale: 4 },
        { date: '2022/11/03', scale: 5 },
        { date: '2022/11/04', scale: 4 },
        { date: '2022/11/05', scale: 5 },
      ];

      new Chart(
        document.getElementById('graph'),
        {
          type: 'line',
          options: {
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
