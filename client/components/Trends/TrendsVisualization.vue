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
      const happiness = this.entries.filter(e => e.condition === "happiness").map(e => {
        return {x: e.date, y: e.scale};
      });
      const pain = this.entries.filter(e => e.condition === "pain").map(e => {
        return {x: e.date, y: e.scale};
      });
      const cognition = this.entries.filter(e => e.condition === "cognition").map(e => {
        return {x: e.date, y: e.scale};
      });

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
              },
              {
                label: 'Pain',
                data: pain
              },
              {
                label: 'Happiness',
                data: happiness
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
