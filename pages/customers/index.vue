<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import type { ICustomer } from "@/types/deals.types";
import { COLLECTION_CUSTOMERS, DB_ID } from "~/app.constants";

useSeoMeta({
  title: "Customers",
});
const {
  data: customers,
  isLoading,
  isError,
} = useQuery({
  queryKey: ["customers"],
  queryFn: () =>
    DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS),
});
</script>
<template>
  <div class="main">
    <h2 class="text-xl font-bold mb-10">Клиенты</h2>
    <UiError v-if="isError">Ошибка загрузки данных!</UiError>
    <UiLoader v-if="isLoading"></UiLoader>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full text-center">
        <thead>
          <tr class="">
            <th>Изображение</th>
            <th>Название</th>
            <th>Электронная почта</th>
            <th>Источник</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in (customers?.documents as unknown as ICustomer[])"
            :key="customer.$id"
          >
            <td>
              <NuxtLink :href="`/customers/edit/${customer.$id}`">
                <img
                  :src="customer.avater_url"
                  :alt="customer.name"
                  width="50"
                  height="50"
                  class="rounded-full"
                />
              </NuxtLink>
            </td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.from_source }}</td>
            <td>
              <NuxtLink :href="`/customers/edit/${customer.$id}`"
                ><UiButton>Редактировать</UiButton></NuxtLink
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
th,
td {
  @apply py-2 px-4 rounded border-y;
}

th {
  @apply bg-sidebarBackground;
}
</style>
