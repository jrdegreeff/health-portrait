<!-- Component for building a graph -->

<template>
  <canvas :id="`graph-${detail}`"></canvas>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
  name: 'TrendsVisualization',
  props: {
    detail: {
      type: String,
      required: true
    }, 
    entries: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.chart();
  },
  methods: {
    async chart() {
      // const happiness = this.entries.map(e => {
      //   return e.condition === "happiness" ? {date: e.date, scale: e.scale} : {};
      // });
      const happiness = this.entries.filter(e => e.condition === "happiness").map(e => {
        return {x: e.date, y: e.scale};
      });
      // const pain = this.entries.map(e => {
      //   return e.condition === "pain" ? {date: e.date, scale: e.scale} : {};
      // });
      const pain = this.entries.filter(e => e.condition === "pain").map(e => {
        return {x: e.date, y: e.scale};
      });
      // const cognition = this.entries.map(e => {
      //   return e.condition === "cognition" ? {date: e.date, scale: e.scale} : {};
      // });
      const cognition = this.entries.filter(e => e.condition === "cognition").map(e => {
        return {x: e.date, y: e.scale};
      });

      console.log(this.entries);

      new Chart(
        document.getElementById(`graph-${this.detail}`),
        {
          type: 'line',
          options: {
            animation : false,
            scales : {
              y : {
                min: 1,
                max: 5,
                ticks: {
                  callback: function(val, index) {
                    // Hide every 2nd tick label
                    return index % 2 === 0 ? this.getLabelForValue(val) : '';
                  }
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: this.detail,
              },
              legend: {
                display: true
              },
              tooltip: {
                enabled: false
              }
            }
          },
          data: {
            labels: this.entries.map(row => row.date),
            datasets: [
              {
                label: 'Cognition',
                data: cognition
                // data: cognition.map(row => row.scale),
                // labels: cognition.map(row => row.date)
              },
              {
                label: 'Pain',
                data: pain
                // data: pain.map(row => row.scale),
                // labels: pain.map(row => row.date)
              },
              {
                label: 'Happiness',
                data: happiness
                // data: happiness.map(row => row.scale),
                // labels: happiness.map(row => row.date)
              }
            ]
          }
        }
      )
    }
  }
};
</script>
<style>
canvas {
  width: 50% !important;
  height: 70% !important;
}
</style>
