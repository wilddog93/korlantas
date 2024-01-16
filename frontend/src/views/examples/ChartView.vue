<script setup lang="ts">
import { Bar, Line, type ChartProps } from 'vue-chartjs';
import PiCard from '@/components/ui/PiCard.vue';
import { barOptions1, barOptions2, lineChart1, barOptions3, transparentize } from '@/chart.options';

const values = [20, 12, 39, 10, 40, 39];
const labels = [
  '1jt-5jt',
  '5jt-10jt',
  '10jt-15jt',
  '20jt-25jt',
  '25jt-30jt',
  '> 30jt',
]

const randomNumber = (n = 12) => {
  return [...Array(n)].map(_ => Math.floor(Math.random() * 100))
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Des',
]

const data1: ChartProps<'bar'>['data'] = {
  labels,
  datasets: [
    {
      label: 'Kerugian Materil',
      backgroundColor: values.map(v => {
        return Math.max(...values) == v ? '#2830ff': '#dfe0ff';
      }),
      borderRadius: 10,
      data: values,
    }
  ],
}

const data2: ChartProps<'line'>['data'] = {
  labels: months,
  datasets: [
    {
      backgroundColor: '#fff',
      borderWidth: 3,
      pointBorderColor: '#2830ff',
      pointBorderWidth: 3,
      borderColor: '#2830ff',
      fill: {
        target: 'origin',
        above: transparentize('#2830ff', 0.9),
      },
      pointStyle: 'circle',
      pointRadius: 4,
      data: randomNumber(),
    },
  ],
}

const data3: ChartProps<'line'>['data'] = {
  labels: months,
  datasets: [
    {
      backgroundColor: '#fff',
      borderWidth: 3,
      pointBorderColor: '#2830ff',
      pointBorderWidth: 3,
      borderColor: '#2830ff',
     
      pointStyle: false,
      pointRadius: 4,
      data: randomNumber(),
    },
    {
      backgroundColor: '#fff',
      borderWidth: 3,
      pointBorderColor: 'red',
      pointBorderWidth: 3,
      borderColor: 'red',
      
      pointStyle: false,
      pointRadius: 4,
      data: randomNumber(),
    },
  ],
}

</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Charts</h1>
  <div class="grid grid-cols-2 gap-5">
    <PiCard class="bg-white rounded-xl p-5">
      <h1 class="text-lg text-gray-500 mb-10 font-medium">Kerugian Materil</h1>
      <Bar :data="data1" :options="barOptions1"  title="Kerugian Materil" />
    </PiCard>
    <PiCard class="bg-white rounded-xl p-5">
      <h1 class="text-lg text-gray-500 mb-10 font-medium">Korban Laka Lantas</h1>
      <Bar :data="data1" :options="barOptions2"  title="Kerugian Materil" />
    </PiCard>
    <PiCard class="bg-white rounded-xl p-5">
      <h1 class="text-lg text-gray-500 mb-10 font-medium">Korban Laka Lantas</h1>
      <Bar :data="data1" :options="barOptions3"  title="Kerugian Materil" />
    </PiCard>
    <PiCard class="bg-white rounded-xl p-5">
      <h1 class="text-lg text-gray-500 mb-10 font-medium">Korban Laka Lantas</h1>
      <Line :data="data2" :options="lineChart1"  title="Kerugian Materil" />
    </PiCard>
    <PiCard class="bg-white rounded-xl p-5">
      <h1 class="text-lg text-gray-500 mb-10 font-medium">Korban Laka Lantas</h1>
      <Line :data="data3" :options="lineChart1"  title="Kerugian Materil" />
    </PiCard>
  </div>
</template>