import { ChartProps } from "vue-chartjs";
import colorLib from '@kurkle/color'

export const transparentize = (value: any, opacity: any) => {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const barOptions1: ChartProps<'bar'>['options']  = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    datalabels: { display: false },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {  
      border: {
        display: false,
      },
      ticks: {
        padding: 10,
      },
      beginAtZero: true,
      grid: {

        // You can change the color, the dash effect, the main axe color, etc.
        color: 'rgba(0,0,0,0)', // for the grid lines
        tickColor: 'transparent', // for the tick mark
        // tickBorderDash: ], // also for the tick, if long enough
        tickLength: 0, // just to see the dotted line
        tickWidth: 0,
        // offset: true,
        drawTicks: false, // true is default
        drawOnChartArea: false // true is default
      },
    },
    y: {
      display: false,
    }
  }
}

export const barOptions2: ChartProps<'bar'>['options']  = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    datalabels: { display: false },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      border: {
        display: false,
      },
      ticks: {
        // forces step size to be 50 units
        stepSize: 10
      },
      beginAtZero: true,
      grid: {
        // You can change the color, the dash effect, the main axe color, etc.
        color: '#dfeef4', // for the grid lines
        tickColor: 'transparent', // for the tick mark
        tickLength: 20, // just to see the dotted line
        tickWidth: 1,
        // offset: true,
        drawTicks: true, // true is default 
        drawOnChartArea: true // true is default 

      },
    },
    x: {
      beginAtZero: true,
      stacked: true,
      ticks: {
        // forces step size to be 50 units
        padding: 10
      },
      grid: {
        // offset: true,
        drawTicks: false, // true is default 
        drawOnChartArea: false // true is default 

      },
      border: { dash: [4, 4] }, // for the grid lines
    },
  }
}

export const barOptions3: ChartProps<'bar'>['options']  = {
  responsive: true,
  indexAxis: 'y',
  maintainAspectRatio: true,
  plugins: {
    datalabels: { display: false },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      border: {
        display: false,
      },
      ticks: {
        // forces step size to be 50 units
        stepSize: 10
      },
      beginAtZero: true,
      grid: {
        // You can change the color, the dash effect, the main axe color, etc.
        color: '#dfeef4', // for the grid lines
        tickColor: 'transparent', // for the tick mark
        tickLength: 20, // just to see the dotted line
        tickWidth: 1,
        // offset: true,
        drawTicks: true, // true is default 
        drawOnChartArea: true // true is default 

      },
    },
    x: {
      beginAtZero: true,
      stacked: true,
      ticks: {
        // forces step size to be 50 units
        padding: 10
      },
      grid: {
        // offset: true,
        drawTicks: false, // true is default 
        drawOnChartArea: false // true is default 

      },
      border: { dash: [4, 4] }, // for the grid lines
    },
  }
}

export const lineChart1: ChartProps<'line'>['options']  = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    datalabels: { display: false },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      border: {
        display: false,
      },
      ticks: {
        // forces step size to be 50 units
        stepSize: 10
      },
      beginAtZero: true,
      grid: {
        // You can change the color, the dash effect, the main axe color, etc.
        color: '#dfeef4', // for the grid lines
        tickColor: 'transparent', // for the tick mark
        tickLength: 20, // just to see the dotted line
        tickWidth: 1,
        // offset: true,
        drawTicks: true, // true is default 
        drawOnChartArea: true // true is default 

      },
    },
    x: {
      beginAtZero: true,
      ticks: {
        // forces step size to be 50 units
        padding: 10
      },
      grid: {
        // offset: true,
        drawTicks: false, // true is default 
        drawOnChartArea: false // true is default 

      },
      border: { dash: [4, 4] }, // for the grid lines
    },
  }
}