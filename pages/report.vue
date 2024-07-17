<script lang="ts" setup>
import dayjs from "dayjs";
import { useQuery } from "@tanstack/vue-query";
import { Query } from "appwrite";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";

useSeoMeta({
  title: "Report",
});

const offset: number = 24 * 60 * 60 * 1000 * 30;
const date: Date = new Date();
date.setTime(date.getTime() - offset);
let isoDate: string = date.toISOString().slice(0, -1) + "+00:00";

const {
  data: deals,
  isLoading,
  isError,
} = useQuery({
  queryKey: [COLLECTION_DEALS],
  queryFn: () =>
    DB.listDocuments(DB_ID, COLLECTION_DEALS, [
      Query.greaterThanEqual("$createdAt", isoDate),
    ]),
});

const pdfSection = ref<HTMLElement | null>(null);
</script>
<template>
  <div class="main">
    <h2 class="text-xl font-bold mb-10">Отчёт</h2>
    <UiError v-if="isError">Ошибка загрузки данных!</UiError>
    <UiLoader v-else-if="isLoading"></UiLoader>
    <div v-else class="flex flex-col items-center">
      <div style="min-height: 75vh">
        <table class="w-[461px]" ref="pdfSection">
          <thead>
            <tr>
              <th>order ID</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="deal in deals?.documents" :key="deal.$id">
              <td>{{ deal.$id }}</td>
              <td>{{ dayjs(deal.$createdAt).format("DD MMMM YYYY") }}</td>
              <td>{{ deal.price }}</td>
            </tr>
            <tr>
              <td colspan="2">The number of orders:</td>
              <td>{{ deals?.documents.length || 0 }}</td>
            </tr>
            <tr>
              <td colspan="2">Сost of all orders:</td>
              <td>
                {{
                  deals?.documents.reduce(
                    (total, deal) => total + deal.price,
                    0
                  ) || 0
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <UiButton class="w-full" @click="exportToPDF('pdf-file.pdf', pdfSection)"
        >Сформировать отчёт</UiButton
      >
    </div>
  </div>
</template>

<style scoped>
th,
td {
  @apply py-2 px-4 rounded;
}

td {
  @apply border;
}

th {
  @apply bg-sidebarBackground;
}
</style>
