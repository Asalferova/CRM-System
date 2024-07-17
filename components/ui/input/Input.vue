<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input
    v-model="modelValue"
    type="text"
    class="w-full p-2 mb-4 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-sidebarBackground"
  />
</template>
