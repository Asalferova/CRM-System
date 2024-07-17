<script lang="ts" setup>
import dayjs from "dayjs";
import { useDealSlideStore } from "@/store/deal-slide.store";

const store = useDealSlideStore();
</script>
<template>
  <div class="border-b-2 mb-10">
    <div class="text-xl font-bold mb-2">О заказе</div>
    <div class="mb-4">
      <KanbanSlideoverLabel :label-text="'Название'">
        <h2>{{ store.card?.name }}</h2>
      </KanbanSlideoverLabel>
    </div>
    <div class="mb-4">
      <KanbanSlideoverLabel :label-text="'Сумма'">
        <h2>{{ convertCurrency(store.card?.price || 0) }}</h2>
      </KanbanSlideoverLabel>
    </div>
    <div class="mb-4">
      <KanbanSlideoverLabel :label-text="'Статус'">
        <h2>{{ store.card?.status }}</h2>
      </KanbanSlideoverLabel>
    </div>
    <div class="mb-4">
      <KanbanSlideoverLabel :label-text="'Клиент'">
        <h2>{{ store.card?.companyName }}</h2>
      </KanbanSlideoverLabel>
    </div>
    <div>
      <KanbanSlideoverLabel :label-text="'Дата создания'" class="mb-10">
        <h2>{{ dayjs(store.card?.$createdAt).format("DD MMMM YYYY") }}</h2>
      </KanbanSlideoverLabel>
    </div>
  </div>
</template>
