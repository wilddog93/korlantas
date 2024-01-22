<script setup lang="ts">
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import PiIcon from '@/components/ui/PiIcon.vue';
import { ref } from 'vue';
import PiInput from '@/components/ui/PiInput.vue';
import Logo1 from '@/assets/images/logo/korlantas-logo-1.png';
import Logo2 from '@/assets/images/logo/korlantas-logo-2.png';
import avatar from '@/assets/images/logo-universal.png';

// const navigation = [
//     { name: 'Dashboard', href: '#', current: true },
//     { name: 'Team', href: '#', current: false },
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Calendar', href: '#', current: false },
// ]

interface Props {
    sideBar: boolean;
}

const searchInput = ref('');
const onClear = () => {
    searchInput.value = ""
}

defineOptions({
  name: 'NavbarView'
})

const { sideBar } = defineProps<Props>()

defineEmits([
  'toggle-sidebar',
])

</script>

<template>
    <Disclosure as="nav" class="bg-white fixed top-0 z-20 inset-x-0">
        <div class="mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between z-20">
                <div class="absolute inset-y-0 left-0 flex items-center">
                    <!-- Mobile menu button-->
                    <button
                        @click="$emit('toggle-sidebar')"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open side menu</span>
                        <PiIcon v-if="!sideBar" type="align-justify" :size="16" class="block h-6 w-6 text-inherit"
                            aria-hidden="true" />
                        <PiIcon v-else type="x" :size="16" class="block h-6 w-6 text-inherit" aria-hidden="true" />
                    </button>
                </div>

                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="w-full lg:max-w-[20rem] flex flex-shrink-0 justify-center gap-6 items-center">
                        <img class="h-10 w-auto" :src="Logo1" alt="Your Company" />
                        <img class="h-10 w-auto" :src="Logo2" alt="Your Company" />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <PiInput v-model="searchInput" prefix-icon="search" clearable @clear="onClear" placeholder="Search..." />
                        </div>
                    </div>
                </div>

                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="ml-auto px-2 py-1.5 flex items-center gap-2 rounded-full bg-gray-300">
                        <button
                            class="bg-white outline-none focus:outline-none focus:shadow-none p-1.5 border border-transparent font-medium text-base leading-6 inline-flex items-center justify-center align-middle relative text-center rounded-full">
                            <div class="flex items-center space-x-3">
                                <PiIcon :size="26" type="bell" class="text-gray-400"></PiIcon>
                            </div>
                            <span class="absolute top-1 right-2 h-3 w-3 bg-red-500 rounded-full"></span>
                        </button>

                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-3 flex">
                            <MenuButton class="h-10 bg-white rounded-full inline-flex items-center gap-2">
                                <img class="p-2 rounded-full object-contain object-center w-12 h-12" :src="avatar"
                                    alt="avatar">
                                <div class="text-xs hidden sm:block">
                                    <p class="text-gray-400">Administrator</p>
                                    <p class="font-bold">Anto Suryadi</p>
                                </div>
                                <PiIcon :size="32" type="more-vertical" class="text-gray-400 p-2 hidden sm:block"></PiIcon>
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute top-12 right-0 z-10 w-48 origin-bottom-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-slot="{ active }">
                                    <a href="#"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your
                                        Profile</a>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                    <a href="#"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                    <a href="#"
                                        :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign
                                        out</a>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>

        <!-- <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
                    :class="[item.current ? 'bg-primary-500 text-white' : 'text-gray-400 hover:bg-primary-400 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
        </DisclosurePanel> -->
    </Disclosure>
</template>