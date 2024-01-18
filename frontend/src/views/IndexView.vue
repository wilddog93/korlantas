<script setup lang="ts">
import { computed, onUpdated, ref, watch } from 'vue';
import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths, startOfWeek, addWeeks, format } from 'date-fns';
import PiIcon from '@/components/ui/PiIcon.vue';
import PiCard from '@/components/ui/PiCard.vue';
import { ChartProps, Doughnut, Bar, Line } from 'vue-chartjs';
import { doughnutOptions1, barOptions4, lineChart1 } from "@/chart.options"
import { main } from "@/data-lakalantas"
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';

const currentDate = new Date();
const date = ref(currentDate);

// Get the start of the current week
const startOfCurrentWeek = startOfWeek(currentDate);
const endOfCurrentWeek = startOfWeek(addWeeks(currentDate, 1));

// Get the start of last week
const startOfLastWeek = startOfWeek(addWeeks(currentDate, -1));
const endOfLastWeek = startOfWeek(addWeeks(startOfLastWeek, 1));

const presetDates = ref([
  { label: 'Today', value: [currentDate, currentDate] },
  // {
  //   label: 'Today (Slot)',
  //   value: [new Date(), new Date()],
  //   slot: 'preset-date-range-button'
  // },
  { label: 'Last week', value: [startOfLastWeek, endOfLastWeek] },
  { label: 'This week', value: [startOfCurrentWeek, endOfCurrentWeek] },
  { label: 'This month', value: [startOfMonth(currentDate), endOfMonth(currentDate)] },
  {
    label: 'Last month',
    value: [startOfMonth(subMonths(currentDate, 1)), endOfMonth(subMonths(currentDate, 1))],
  },
  { label: 'This year', value: [startOfYear(currentDate), endOfYear(currentDate)] },
]);

// chart-doughnut
const values = computed(() => main.map((item) => item.totalKecelakaan));
const labels = computed(() => main.map((item) => item.name));
const colors = computed(() => main.map((item) => item.color));

const dataDougnut: ChartProps<'doughnut'>['data'] = {
  labels: labels.value,
  datasets: [
    {
      backgroundColor: colors.value,
      hoverOffset: 4,
      data: values.value,
    }
  ],
}

// stacked-bar
const randomNumber = (n = 12) => {
  return [...Array(n)].map(_ => Math.floor(Math.random() * 100))
}

const mainStackBar = computed(() => {
  let newArr: any[] = [];
  main.length && main.map((data) => {
    newArr.push({
      name: data.name,
      totalKecelakaan: data.totalKecelakaan,
      totalLukaRingan: data.ringan.reduce((curr: any, item) => curr + item.total, 0),
      totalLukaBerat: data.berat.reduce((curr: any, item) => curr + item.total, 0),
      totalMeninggal: data.meninggal.reduce((curr: any, item) => curr + item.total, 0)
    })
  })
  return newArr
})

const resultBar = computed<ChartProps<'bar'>["data"]>(() => ({
  labels: mainStackBar.value.map((item) => item.name),
  datasets: [
    {
      label: "Luka Ringan",
      data: mainStackBar.value.map((item) => item.totalLukaRingan),
      // data: randomNumber(mainStackBar.value.length),
      backgroundColor: "#FDD835",
      borderRadius: 5
    },
    {
      label: "Luka Berat",
      data: mainStackBar.value.map((item) => item.totalLukaBerat),
      // data: randomNumber(mainStackBar.value.length),
      backgroundColor: "#FF734C",
      borderRadius: 5
    },
    {
      label: "Meninggal",
      data: mainStackBar.value.map((item) => item.totalMeninggal),
      // data: randomNumber(mainStackBar.value.length),
      backgroundColor: "#FF006B",
      borderRadius: 5
    }
  ]
}))

// line-chart
const filterDataByName = (data: any[], name: string) => {
  return data.find((item) => item.name === name);
}

// Function to transform data for Chart.js
const transformDataForChart = (data: any[], category: string, color?: string) => {
  return data.map((item) => ({
    label: item.name,
    data: item[category].map((entry: any) => entry.total),
    backgroundColor: item.color || color,
  }));
}

// Create a function to update the chart
const updateChart = (selectedName: string) => {
  const filteredData = filterDataByName(main, selectedName);
  console.log(filteredData, 'result')
  let chartData: ChartProps<'line'>['data'] = {
    labels: [],
    datasets: []
  }
  if (filteredData) {
    // const ringanData = transformDataForChart(main, 'ringan', "#FDD835");
    // const beratData = transformDataForChart(main, 'berat', "#FF734C");
    // const meninggalData = transformDataForChart(main, 'meninggal', "#FF006B");
    // const ringanValues = filteredData.ringan.map((entry: any) => entry.total);
    // const beratValues = filteredData.berat.map((entry: any) => entry.total);
    // const meninggalValues = filteredData.meninggal.map((entry: any) => entry.total);

    chartData = {
      labels: filteredData.ringan.map((entry: any) => format(new Date(entry.datetime), "LLLL")),
      datasets: [
        {
          label: 'Ringan',
          data: randomNumber(filteredData.ringan.length),
          borderColor: 'rgba(41, 204, 255, 1)',
          backgroundColor: 'rgba(41, 204, 255, 0.2)',
          // fill: true,
        },
        {
          label: 'Berat',
          // data: beratValues,
          data: randomNumber(filteredData.berat.length),
          borderColor: 'rgba(255, 115, 76, 1)',
          backgroundColor: 'rgba(255, 115, 76, 0.2)',
          // fill: true,
        },
        {
          label: 'Meninggal',
          // data: meninggalValues,
          data: randomNumber(filteredData.meninggal.length),
          borderColor: '#FF006B',
          backgroundColor: '#FF006B',
          // fill: true,
        },
      ],
    };
  }
  return chartData
}

const areaOptions: SelectOption[] = main.map((item) => ({
  label: item.name,
  value: item.name
}))
const selectedArea = ref<any>(areaOptions[0].label);

const chartUpdated = computed(() => updateChart(selectedArea.value));
watch(chartUpdated, (value) => console.log(value, 'line-chart'))
console.log(mainStackBar.value, 'selected', selectedArea.value)

</script>

<template>
  <div class="w-full bg-gray-100 p-4 tracking-wide">
    <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
      <h3 class="font-semibold text-lg">Dashboard</h3>
      <div>
        <VueDatePicker v-model="date" range :preset-dates="presetDates">
          <template #dp-input="{ value }">
            <input type="text" :value="value"
              class="w-full px-8 py-1.5 rounded-full border border-gray-300 focus:border-primary-500 text-xs">
          </template>
          <template #input-icon>
            <PiIcon type="calendar" :size="16" class="ml-2" />
          </template>
          <template #preset-date-range-button="{ label, value, presetDate }">
            <span role="button" :tabindex="0" @click="presetDate(value)" @keyup.enter.prevent="presetDate(value)"
              @keyup.space.prevent="presetDate(value)">
              {{ label }}
            </span>
          </template>
        </VueDatePicker>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 text-sm">
      <PiCard class="bg-white p-4 lg:col-span-2">
        <div class="w-full">
          <h3 class="text-lg">Data Kecelakaan</h3>

          <div class="w-full flex flex-col lg:flex-row">
            <div class="w-full lg:w-2/3 m-auto">
              <div class="w-full h-[325px]">
                <Doughnut :data="dataDougnut" :options="doughnutOptions1" title="Data Kecelakaan" />
              </div>
            </div>

            <div class="w-full lg:w-1/3">
              <div class="grid grid-cols-2 gap-2">
                <PiCard v-for="(item, index) in main" :key="index" class="bg-gray-200 p-4 overflow-hidden"
                  :class="[index == main.length - 1 ? ' col-end-3' : '']">
                  <div class="flex gap-1 font-bold text-xs items-center">
                    <div>
                      <div :style="{ backgroundColor: item.color }" class="h-2 w-2 rounded-full" />
                    </div>
                    <h3>{{ item.name }}</h3>
                  </div>
                  <p class="font-bold text-2xl lg:text-3xl">{{ item.totalKecelakaan }}</p>
                </PiCard>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mt-10">
          <div class="w-full flex flex-col lg:flex-row lg:items-center gap-2">
            <h3 class="text-lg">Statistik</h3>
            <div class="w-full max-w-[13rem] lg:ml-auto flex gap-2 items-center">
              <span>Filter:</span>
              <div class="w-full max-w-[10rem]">
                <PiSelect btn-class="rounded-full py-2 focus:border focus:border-primary-500" v-model="selectedArea"
                  :options="areaOptions" :selected-text="selectedArea"></PiSelect>
              </div>
            </div>
          </div>
          <div class="w-full h-[325px]">
            <Line :data="updateChart(selectedArea)" :options="lineChart1" title="Kerugian Materil" />
          </div>
        </div>
      </PiCard>

      <div class="w-full">
        <PiCard class="bg-white p-4">
          <h1 class="text-lg text-gray-500 mb-5 font-medium">Data Korban Kecelakaan</h1>

          <div class="grid grid-cols-3 gap-2">
            <PiCard class="p-4">
              <div class="flex gap-1 font-bold text-xs items-center">
                <div>
                  <div style="background-color: #FDD835;" class="h-2 w-2 rounded-full"></div>
                </div>
                <h3>Ringan</h3>
              </div>
              <p class="font-bold text-2xl lg:text-3xl">{{ mainStackBar.reduce((curr: any, val) => curr +
                val.totalLukaRingan, 0) }}</p>
            </PiCard>

            <PiCard class="p-4">
              <div class="flex gap-1 font-bold text-xs items-center">
                <div>
                  <div style="background-color: #FF734C;" class="h-2 w-2 rounded-full"></div>
                </div>
                <h3>Berat</h3>
              </div>
              <p class="font-bold text-2xl lg:text-3xl">{{ mainStackBar.reduce((curr: any, val) => curr +
                val.totalLukaBerat, 0) }}</p>
            </PiCard>

            <PiCard class="p-4">
              <div class="flex gap-1 font-bold text-xs items-center">
                <div>
                  <div style="background-color: #FF006B;" class="h-2 w-2 rounded-full"></div>
                </div>
                <h3>Meninggal</h3>
              </div>
              <p class="font-bold text-2xl lg:text-3xl">{{ mainStackBar.reduce((curr: any, val) => curr +
                              val.totalMeninggal, 0) }}</p>
            </PiCard>
        </div>

        <div class="w-full h-[325px]">
          <Bar :data="resultBar" :options="barOptions4" title="Data Korban Kecelakaan" />
        </div>
      </PiCard>
    </div>
  </div>
</div></template>