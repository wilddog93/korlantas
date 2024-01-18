<script setup lang="ts">
import { ref } from 'vue';
import NavbarView from './NavbarView.vue';
import PiIcon from './ui/PiIcon.vue';

const sideBar = ref<boolean>(false)
const navbarRef = ref<HTMLDivElement | null>(null)
const sidebarRef = ref<HTMLDivElement | null>(null)
// const navbarHeight = computed(
//   () => navbarRef.value?.clientHeight || 0
// )

// const calculatedHeight = computed(() => {
//   return window.innerHeight - navbarHeight.value
// })

const toggleBar = () => {
  sideBar.value = !sideBar.value
}

interface Menu {
  to: string;
  label: string;
  icon?: string;
}

const menus: Menu[] = [
  { to: 'home', label: 'Dashboard', icon: "layout" },
  { to: 'rekap-lakalantas', label: 'Rekap Lakalantas', icon: "list" },
  { to: 'pengumuman', label: 'Pengumuman', icon: "info" },
  { to: 'pengaturan-form', label: 'Pengaturan Form', icon: "clipboard" },
  { to: 'laporan', label: 'Laporan', icon: "book" },
  { to: 'data-petugas', label: 'Data Petugas', icon: "folder" },
];

</script>

<template>
  <main class="relative h-screen overflow-auto">
    <NavbarView ref="navbarRef" :side-bar="sideBar" @toggle-sidebar="toggleBar" />

    <aside ref="sidebarRef"
      class="absolute lg:static z-30 top-0 mt-0 lg:mt-16 h-full w-full max-w-xs p-4 inset-y-0 left-0 flex flex-col overflow-y-auto bg-gray-100 transform duration-300 ease-in-out  border-0 lg:border-r-2 border-gray-400 lg:translate-x-0"
      :class="[sideBar ? '' : '-translate-x-full']">
      <div class="w-full flex flex-col gap-3">
        <div class="w-full flex gap-1 items-start">
          <h3 class="text-3xl px-4 mb-3">Selamat Datang, Anto Suryadi</h3>
          <button class="lg:hidden" @click.event="toggleBar">
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
      </div>
    </aside>

    <div @click="toggleBar" class="w-full inset-0 fixed z-20 bg-dark-900/20 sm:hidden"
      :class="[sideBar ? 'translate-x-0' : '-translate-x-full']"></div>

    <main
      class="fixed top-16 bottom-0 inset-x-0 mx-auto max-w-screen duration-300 ease-in-out overflow-x-hidden overflow-y-auto lg:ml-[20rem] p-4">
      <slot></slot>
    </main>
  </main>
</template>
