<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Spinner from './PiSpinner.vue'

export interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'primary' | 'secondary' | 'error' | 'dark'
  baseClass?: string
  primaryClass?: string
  secondaryClass?: string
  errorClass?: string
  darkClass?: string
  defaultClass?: string
  disableClass?: string
  spinnerClass?: string
  name?: string
  disabled?: boolean
  loading?: boolean
  nuxt?: boolean
  ref?: string
}

defineOptions({
  name: 'PiButton'
})

const props = withDefaults(defineProps<Props>(), {
  baseClass:
    'outline-none focus:outline-none focus:shadow-none px-5 h-10 border border-transparent font-medium rounded-lg text-base leading-6 inline-flex items-center justify-center align-middle relative text-center',
  primaryClass:
    'text-white bg-primary-600 hover:bg-primary-500 focus:bg-primary-400',
  secondaryClass:
    'text-white bg-secondary-600 hover:bg-secondary-500 focus:bg-secondary-400',
  errorClass:
    'text-white bg-error-600 hover:bg-error-500 focus:bg-error-400',
  darkClass:
    'text-white bg-dark-900 hover:bg-dark-800 focus:bg-dark-700',
  defaultClass:
    'bg-white border-gray-300 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-300',
  disableClass: 'bg-gray-200 text-gray-500 cursor-not-allowed',
  spinnerClass:
    'absolute flex items-center justify-center inset-0 w-full text-gray-500',
})

const attrs = useAttrs()

const component = computed(() => {
  if (attrs.to && props.nuxt) {
    return 'nuxt-link';
  } else if (attrs.to) {
    return 'router-link';
  } else if (attrs.href) {
    return 'a';
  } else {
    return 'button';
  }
})

const btnClasses = computed(() => {
  const classes = [props.baseClass];

  if (props.disabled) {
    classes.push(props.disableClass);
  } else  {
    switch (props.variant) {
      case 'primary':
        classes.push(props.primaryClass);
        break;
      case 'secondary':
        classes.push(props.secondaryClass);
        break;
      case 'error':
        classes.push(props.errorClass);
        break;
      case 'dark':
        classes.push(props.darkClass);
        break;
      default:
        classes.push(props.defaultClass);
        break;
    }
  }
  return classes;
});

const isDisabled = computed(() => props.disabled || props.loading)

</script>

<template>
  <component
    v-bind="$attrs"
    :is="component"
    :name="name"
    :ref="ref"
    :type="type"
    :class="[baseClass, isDisabled ? disableClass : btnClasses]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" :class="spinnerClass">
      <Spinner class="w-5 h-5" />
    </span>
    <span :class="{ 'opacity-0': loading }">
      <slot></slot>
    </span>
  </component>
</template>