<!-- Component for building a graph -->

<template>
  <canvas :id="`graph-${title}`"></canvas>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
  name: 'TrendsVisualization',
  props: {
    title: {
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

      const colors = {
        green: '#008067',
        orange: '#A94103', 
        purple: '#6B06C4',
        black: '#000'
      }

      new Chart(
        document.getElementById(`graph-${this.title}`),
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
                  padding: 15,
                  font: {
                    size: 16
                  }
                }
              },
              x: {
                ticks: {
                  font: {
                    size: 16
                  }
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: this.title,
                color: colors.black,
                font: {
                  size: 24
                }
              },
              legend: {
                display: true,
                labels: {
                  font: {
                    size: 14
                  }
                }
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
                borderColor: colors.green,
                backgroundColor: colors.green
              },
              {
                label: 'Pain',
                data: pain,
                borderColor: colors.orange,
                backgroundColor: colors.orange
              },
              {
                label: 'Happiness',
                data: happiness,
                borderColor: colors.purple,
                backgroundColor: colors.purple
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
  width: 59rem !important;
  height: 30rem !important;
}
</style>
