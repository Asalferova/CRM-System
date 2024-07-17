<script lang="ts" setup>
import { MENU } from "./menu.data";
</script>

<template>
  <div class="menu flex flex-col gap-1 items-center justify-center">
    <NuxtLink
      class="btn flex w-fit transition-all hover:font-bold py-3 px-8 min-w-64 text-lg"
      v-for="item in MENU"
      :key="item.name"
      :to="item.url"
      :class="{ 'font-bold': $route.path === item.url }"
    >
      <Icon :name="item.icon" class="mr-5 text-icon text-xl" />
      <span>{{ item.name }}</span>
    </NuxtLink>
  </div>
</template>
