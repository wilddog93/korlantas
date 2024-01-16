<script setup lang="ts">
import PiTable, { type TableColumn } from '@/components/ui/PiTable.vue';
import useAxios from '@/composables/use-axios';
import { computed, reactive, ref, watch } from 'vue';

interface Meta {
  page: number
  limit: number
  total: number
}

interface Data {
  id: number
  first_name: number
  last_name: number
  email: string
  avatar: string
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
const axios = useAxios();

// const fetchData = async (pager = 1) => {
//   try {
//     fetching.value = true
//     const { data, page, total } = await axios.$get('users', {
//       params: {
//         per_page: 10,
//         page: pager,
//       }
//     });
//     table.data = data;
//     table.meta = { page, total, limit: 10 }
//   } catch (error) {
//     //
//   } finally {
//     fetching.value = false
//   }
// }
const fetchData = async (pager = 1) => {
  try {
    fetching.value = true
    const { users, total, page, limit } = await axios.$get('users', {
      params: {
        limit: 10,
        page: pager,
      }
    });
    table.data = users;
    table.meta = { page, total, limit }
  } catch (error) {
    //
  } finally {
    fetching.value = false
  }
}

fetchData();

watch(() => table.meta.page, (v) => {
  fetchData(v);
})

// Fillables
const columns = computed<TableColumn[]>(() => [
  { label: "ID", key: "id", isKey: true },
  { label: "Email", key: "email" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "University", key: "university" },
]);

const selectAll = ref(false);
const selected = ref([])

</script>

<template>
  <h1 class="text-lg font-medium border-b pb-2 mb-5 flex">Table</h1>
  <div>
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
      <template v-slot:avatar="{ avatar }">
        <div class="overflow-hidden rounded-full object-cover h-10 w-10">
          <img :src="avatar">
        </div>
      </template>
    </PiTable>
</div>
</template>