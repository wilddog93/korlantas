<script setup lang="ts">
import * as feather from 'feather-icons'
import { computed, type SVGAttributes } from 'vue'

export interface Props {
  type: feather.FeatherIconNames
  size?: string | number
  fill?: string
}

defineOptions({
  name: 'PiIcon'
})

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  stroke: 'currentColor',
  fill: 'none'
})

const icon = computed(() => feather.icons[props.type])
const attrs = icon.value.attrs as SVGAttributes
</script>

<template>
  <svg
    :class="[icon.attrs.class, 'feather_content text-gray-400']"
    v-bind="{ ...attrs, width: size, height: size }"
    v-html="icon.contents"
  ></svg>
</template>