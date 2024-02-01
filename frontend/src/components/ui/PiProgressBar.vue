<script setup lang="ts">
import { computed } from 'vue';
import Spinner from '@/components/ui/PiSpinner.vue'

export interface Props {
    size?: string | 'xs' | 'sm' | 'md' | 'lg'
    variant?: 'default' | 'primary' | 'secondary' | 'error' | 'dark'
    baseClass?: string
    primaryClass?: string
    secondaryClass?: string
    errorClass?: string
    defaultClass?: string
    spinnerClass?: string
    disableClass?: string
    disabled?: boolean
    loading?: boolean
    ref?: string
    label?: string;
    labelClass?: string;
    value?: number;
}

const props = withDefaults(defineProps<Props>(), {
    baseClass:
        'h-full flex justify-center items-center text-xs font-medium text-center p-0.5 leading-none rounded-full',
    primaryClass:
        'text-white bg-primary-600 hover:bg-primary-500 focus:bg-primary-400',
    secondaryClass:
        'text-white bg-secondary-600 hover:bg-secondary-500 focus:bg-secondary-400',
    errorClass:
        'text-white bg-error-600 hover:bg-error-500 focus:bg-error-400',
    darkClass:
        'text-white bg-dark-900 hover:bg-dark-800 focus:bg-dark-700',
    defaultClass:
        'text-white bg-gray-600 hover:bg-gray-500 focus:bg-gray-400',
    disableClass: 'bg-gray-200 text-gray-800 cursor-not-allowed',
    spinnerClass:
        'absolute z-10 flex items-center justify-center inset-0 w-full text-white',
})

const progressClasses = computed(() => {
    const classes = [props.baseClass];

    if (props.disabled) {
        classes.push(props.disableClass);
    } else {
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

const sizes = computed(() => {
    const sizeClass: string[] = []
    switch (props.size) {
        case 'xs':
            sizeClass.push('h-1')
            break;
        case 'sm':
            sizeClass.push('h-2')
            break;
        case 'md':
            sizeClass.push('h-4')
            break;
        case 'lg':
            sizeClass.push('h-6')
            break;
        default:
            sizeClass.push('h-2')
            break;
    }
    return sizeClass
})

const isDisabled = computed(() => props.disabled)

defineOptions({
    name: 'PiProgressBar'
})
</script>

<template>
    <div v-if="label" :class="labelClass">{{ label }}</div>
    <div class="relative w-full bg-gray-200 rounded-full" :class="[sizes]">
        <div :ref="ref" :class="[baseClass, isDisabled ? disableClass : progressClasses.concat(`${(value && value < 99) ? 'rounded-r-none' : ' '}`)]" :disabled="disabled || loading"
            :style="{ width: `${value}%` }">
            <div 
                class="absolute z-10 flex items-center justify-center inset-0 w-full"
                :class="[(value && value >= 50) ? 'text-inherit' : 'text-gray-600']"
            >{{ value }}%</div>
            <span v-if="loading" :class="spinnerClass">
                <Spinner class="w-5 h-5" />
            </span>
        </div>
    </div>
</template>