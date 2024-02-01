<script setup lang="ts">
import { computed, ref } from 'vue';
import PiIcon from '@/components/ui/PiIcon.vue';
import { announces } from '@/data-lakalantas'
import { format } from 'date-fns';

interface Props {
  sideBar: boolean;
}

interface Menu {
  to: string;
  label: string;
  icon?: string;
}

defineOptions({
  name: 'SidebarView'
})

const { sideBar } = defineProps<Props>()

defineEmits([
  'toggle-sidebar',
])

const menus: Menu[] = [
  { to: 'home', label: 'Dashboard', icon: "layout" },
  { to: 'rekap-lakalantas', label: 'Rekap Lakalantas', icon: "list" },
  { to: 'pengumuman', label: 'Pengumuman', icon: "info" },
  { to: 'pengaturan-form', label: 'Pengaturan Form', icon: "clipboard" },
  { to: 'laporan', label: 'Cetak Laporan', icon: "book" },
  { to: 'data-petugas', label: 'Data Petugas', icon: "folder" },
];

const diplayAnnounces = ref<any[]>(announces.slice(0, 3))
const loadMoreCount = ref<number>(3);
const showLoadMore = computed(() => {
  return diplayAnnounces.value.length < announces.length;
})
const loadMore = () => {
  const endIndex = diplayAnnounces.value.length + loadMoreCount.value;
  diplayAnnounces.value = announces.slice(0, endIndex);
}

const lessMore = () => {
  // const endIndex = diplayAnnounces.value.length - loadMoreCount.value;
  diplayAnnounces.value = announces.slice(0, 3);
}

</script>

<template>
  <aside
    class="fixed lg:static z-30 mt-0 left-0 lg:mt-16 h-full w-full max-w-xs p-4 flex flex-col overflow-y-auto bg-gray-100 transform duration-300 ease-in-out border-0 lg:border-r-2 border-gray-400 lg:translate-x-0"
    :class="[sideBar ? '' : '-translate-x-full']">
    <div class="w-full flex flex-col gap-3">
      <div class="w-full flex gap-1 items-start">
        <h3 class="text-3xl px-4 mb-3">Selamat Datang, Anto Suryadi</h3>
        <button class="lg:hidden" @click="$emit('toggle-sidebar')">
          <PiIcon type="x" :size="24" class="rounded-full bg-dark-500 text-gray-100 p-1" />
        </button>
      </div>
      <nav>
        <ul>
          <li v-for="(menu, id) in menus" :key="id">
            <RouterLink :to="{ name: menu.to }"
              class="text-gray-500 px-3 py-2 block duration-300 ease-in-out transform hover:bg-primary-500 hover:text-gray-100 rounded-full"
              :class="[menus.length - 1 == id ? '' : 'mb-3']" exact-active-class="bg-primary-500 text-gray-100">
              <div class="flex gap-1 items-center">
                <PiIcon :v-if="menu.icon" :type="(menu.icon as any)" class="text-inherit" />
                {{ menu.label }}
              </div>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- announces -->
      <PiCard class="bg-white p-4 rounded-xl text-sm">
        <h1 class="text-gray-500 text-md mb-3">Pengumuman Terbaru</h1>
        <ul class="">
          <li v-for="(announce, index) in diplayAnnounces" :key="index" class="border-b border-gray-300 p-2"
            :class="[diplayAnnounces.length - 1 == index ? '' : 'mb-3']">
            <p class="font-semibold">{{ announce.description }}</p>
            <p v-if="announce.datetime">{{ format(new Date(announce.datetime), "dd MMM yyyy hh:mm") }}</p>
          </li>
          <button @click="loadMore" v-if="showLoadMore" class="w-full text-primary-600 font-semibold mt-3">Tampilkan..</button>
          <button @click="lessMore" v-else class="w-full text-primary-600 font-semibold mt-3">Sembunyikan..</button>
        </ul>
      </PiCard>
    </div>
  </aside>
</template>