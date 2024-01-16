<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Button from './PiButton.vue'
import Icon from './PiIcon.vue'

export interface Props {
  modelValue: boolean
  width?: string
  showHeader?: boolean
  showFooter?: boolean
  bodyClass?: any
  title?: string
  body?: any
  bodyHeight?: string
  bodyMinHeight?: string
  loading?: boolean
  disableConfirm?: boolean
  okText?: string
  toBody?: boolean
}

defineOptions({
  name: 'PiModal'
})

const props = withDefaults(defineProps<Props>(), {
  width: 'max-w-xl',
  confirmText: 'Confirm',
  showHeader: true,
  title: 'Modal title',
  toBody: true,
  showFooter: true,
  okText: 'Confirm'
})

const emit = defineEmits(['update:modelValue', 'close', 'click-mask', 'ok'])

const value = computed({
  get:() => props.modelValue,
  set:(value) => emit('update:modelValue', value)
})

const close = () => {
  emit('close')
  value.value = false
}

const modal = ref<Node>()
watch(
  () => value.value,
  (val) => {
    const el = document.body;
    if (val) {
      if (props.toBody && el) {
        el.appendChild(modal.value as Node)
        el.style.overflow = 'hidden'
      }
    } else {
      el.setAttribute('style', '')
    }
  }
);

</script>
<template>
  <transition name="modal">
    <div
      v-show="modelValue"
      ref="modal"
      class="fixed h-full top-0 right-0 bottom-0 left-0 z-50 bg-black bg-opacity-50 overflow-scroll"
    >
      <div
        class="absolute top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center"
        @click.stop="$emit('click-mask')"
      >
        <div
          v-bind="$attrs"
          :class="['bg-white relative shadow-lg overflow-hidden w-full rounded-xl', width]"
        >
          <div
            v-if="showHeader"
            class="relative px-4 py-3 flex items-center z-10"
          >
            <slot name="inside"></slot>
            <h3 class="text-lg text-gray-800 font-medium">
              <slot name="title">
                {{ title }}
              </slot>
            </h3>
            <Icon
              type="x"
              class="ml-auto cursor-pointer opacity-75 hover:opacity-100 text-gray-800"
              @click.stop="close"
            />
          </div>
          <div
            :style="{ maxHeight: bodyHeight, minHeight: bodyMinHeight }"
            :class="bodyClass"
            class="relative text-gray-600 py-6 overflow-scroll px-4"
          >
            <slot>
              {{ body }}
            </slot>
          </div>
          <div
            v-if="showFooter"
            class="relative px-4 py-4 flex items-center justify-end space-x-2"
          >
            <Button
              :loading="loading"
              :disabled="loading"
              variant="primary"
              @click="$emit('ok')"
            >
              {{ okText }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>