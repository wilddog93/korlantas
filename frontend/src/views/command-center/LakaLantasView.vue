<script setup lang="ts">
import PiSelect, { type Option as SelectOption } from '@/components/ui/PiSelect.vue';
import PiTable, { TableColumn } from '@/components/ui/PiTable.vue';
import useAxios from '@/composables/use-axios';
import { computed, reactive, ref, watch } from 'vue';
import { dataTables } from "@/data-lakalantas"

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
            <h3 class="font-semibold text-lg">Data Kecelakaan</h3>
            <div class="w-full max-w-[12rem]">
                <PiSelect btn-class="rounded-full py-2 focus:border focus:border-primary-500" v-model="selectedInduk"
                    :options="indukOptions" :selected-text="selectedInduk" placeholder="Pilih induk"></PiSelect>
            </div>
        </div>

        <div class="w-full">
            <PiTable 
                selectalbe 
                search-placeholder="Search user" 
                column-key="id" 
                :columns="columns" 
                :rows="table.data"
                :loading="fetching" 
                :extra-height="140" 
                v-model:selected="selected" 
                v-model:selectAll="selectAll"
                v-model:pagination="table.meta"
            >
                
            </PiTable>
        </div>
    </div>
</template>