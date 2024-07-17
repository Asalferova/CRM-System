<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  labelText: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div>
    <h2 v-if="labelText" class="text-xl">{{ labelText }}</h2>
    <div class="text-lg font-semibold text-sidebarBackground">
      <slot></slot>
    </div>
  </div>
</template>
