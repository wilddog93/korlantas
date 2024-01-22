<script setup lang="ts">
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';
import PiTable, { TableColumn } from '@/components/ui/PiTable.vue';
import useAxios from '@/composables/use-axios';
import { computed, reactive, ref, watch } from 'vue';
import { dataTables } from "@/data-lakalantas"
import { addWeeks, endOfMonth, endOfYear, startOfMonth, startOfWeek, startOfYear, subMonths } from 'date-fns';
import PiIcon from '@/components/ui/PiIcon.vue';
import ButtonView from '../examples/ButtonView.vue';
import PiButton from '@/components/ui/PiButton.vue';
// search-table
const searchInput = ref('');
const onClear = () => {
    searchInput.value = ""
}

const indukOptions: SelectOption[] = [
    {
        label: "parent",
        value: "parent"
    },
    {
        label: "children",
        value: "children"
    },
];

const selectedInduk = ref<any>();

// kategori-option
const categoryOptions: SelectOption[] = [
    {
        label: "Depan",
        value: "depan"
    },
    {
        label: "Belakang",
        value: "belakang"
    },
    {
        label: "Kiri",
        value: "kiri"
    },
    {
        label: "Kanan",
        value: "kanan"
    },
    {
        label: "Depan - Belakang",
        value: "depan-belakang"
    },
    {
        label: "Kiri - Kanan",
        value: "kiri-kanan"
    },
];
const selectedCategory = ref<any>();

// date-range
const currentDate = new Date();
const date = ref([currentDate, currentDate]);

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


const columns = computed<TableColumn[]>(() => [
    { label: "ID", key: "id", isKey: true },
    { label: "KOde Lantas", key: "kode_lantas" },
    { label: "Petugas", key: "petugas" },
    { label: "Lokasi", key: "lokasi" },
    { label: "Ruas Jalan", key: "ruas_jalan" },
    { label: "KM", key: "kilometer" },
    { label: "Jenis", key: "jenis" },
    { label: "Kategori", key: "kategori" },
    { label: "Waktu Kecelakaan", key: "waktu_kecelakaan" },
]);

interface Meta {
    page: number
    limit: number
    total: number
}

interface Data {
    id?: number | string;
    kode_lantas?: string | number;
    petugas?: string;
    lokasi?: string;
    ruas_jalan?: string;
    kilometer?: string | number;
    jenis?: string;
    kategori?: string | any;
    waktu_kecelakaan?: string;
}

interface Response {
    data: Data[]
    meta: Meta
}

const defaultMeta = (): Meta => ({
    page: 1,
    total: 0,
    limit: 10,
})

const table = reactive<Response>({
    data: [],
    meta: defaultMeta(),
})

const fetching = ref(false)
// const axios = useAxios();

const fetchData = async (pager = 1) => {
    try {
        fetching.value = true
        const { data, total, page, limit } = await dataTables
        table.data = data;
        table.meta = { page, total, limit }
    } catch (error) {
        console.log(error)
    } finally {
        fetching.value = false
    }
}

fetchData();

watch(() => table.meta.page, (v) => {
    fetchData(v);
})

const selectAll = ref(false);
const selected = ref([])

</script>


<template>
    <div class="w-full bg-gray-100 p-4 tracking-wide">
        <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
            <div class="w-full lg:w-1/2">
                <h3 class="font-semibold text-lg">Data Petugas</h3>
            </div>
            <div class="w-full lg:w-1/2 flex items-center justify-end gap-2">
                <button type="button" class="rounded-full px-5 h-10 bg-white border hover:bg-gray-200 text-gray-500 text-sm" >
                    <div class="flex items-center space-x-3">
                        <span>Unggah Data</span>
                        <PiIcon :size="16" type="upload" class="text-inherit"></PiIcon>
                    </div>
                </button>

                <button type="button" class="rounded-full px-5 h-10 bg-primary-600 hover:bg-primary-500 text-white text-sm" >
                    <div class="flex items-center space-x-3">
                        <span>Tambah Pengumuman</span>
                        <PiIcon :size="16" type="plus" class="text-white"></PiIcon>
                    </div>
                </button>
            </div>
        </div>

        <div class="w-full">
            <PiTable selectalbe search-placeholder="Search user" v-model:search="searchInput" @clear-search="onClear"
                column-key="id" :columns="columns" :rows="table.data" :loading="fetching" :extra-height="200"
                v-model:selected="selected" v-model:selectAll="selectAll" v-model:pagination="table.meta">
                <div class="w-full flex flex-col lg:flex-row gap-2 justify-end">
                    <div class="w-2/3 flex gap-1 px-2 items-center justify-end">
                        <p class="text-sm w-full max-w-max text-gray-500">Jenis Kecelakaan:</p>
                        <div class="w-full max-w-[10rem]">
                            <PiSelect btn-class="rounded-full py-2 focus:border focus:border-primary-500 bg-white"
                                v-model="selectedCategory" :options="categoryOptions" :selected-text="selectedCategory"
                                placeholder="Pilih Jenis"></PiSelect>
                        </div>
                    </div>

                    <div class="w-1/3">
                        <VueDatePicker v-model="date" range :preset-dates="presetDates">
                            <template #dp-input="{ value }">
                                <input type="text" :value="value"
                                    class="w-full px-8 py-2 rounded-full border border-gray-300 focus:border-primary-500 text-sm">
                            </template>
                            <template #input-icon>
                                <PiIcon type="calendar" :size="16" class="ml-2" />
                            </template>
                            <template #preset-date-range-button="{ label, value, presetDate }">
                                <span role="button" :tabindex="0" @click="presetDate(value)"
                                    @keyup.enter.prevent="presetDate(value)" @keyup.space.prevent="presetDate(value)">
                                    {{ label }}
                                </span>
                            </template>
                        </VueDatePicker>
                    </div>
                </div>
            </PiTable>
        </div>
    </div>
</template>