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
            pointRadius : 7,
            pointHoverRadius : 10,
            scales : {
              y : {
                min: 0,
                max: 11,
                ticks: {
                  callback: function(val, index) {
                    // Hide y-axis labels at 0 and 11
                    return !([0, 11].includes(index)) ? this.getLabelForValue(val) : '';
                  },
                  stepSize: 1,
                  padding: 15
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: this.detail
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
                data: cognition, 
                borderColor: '#008067',
                backgroundColor: '#008067'
              },
              {
                label: 'Pain',
                data: pain,
                borderColor: '#A94103',
                backgroundColor: '#A94103'
              },
              {
                label: 'Happiness',
                data: happiness,
                borderColor: '#6B06C4',
                backgroundColor: '#6B06C4'
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
  width: 30rem !important;
  height: 15rem !important;
}
</style>
