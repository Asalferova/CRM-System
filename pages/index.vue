<script lang="ts" setup>
import { useKanbanQuery } from "@/components/kanban/useKanbanQuery";
import type { ICard, IColumn } from "@/components/kanban/kanban.types";
import { convertCurrency } from "@/utils/convertCurrency";
import { useMutation } from "@tanstack/vue-query";
import dayjs from "dayjs";
import type { EnumStatus } from "@/types/deals.types";
import { useDealSlideStore } from "@/store/deal-slide.store";
useSeoMeta({
  title: "Orders",
});

const config = useRuntimeConfig();
const dragCardRef = ref<ICard | null>(null);
const sourceColumnRef = ref<IColumn | null>(null);
const { data, isLoading, refetch, isError } = useKanbanQuery();

type TypeMutationVariables = {
  docId: string;
  status?: EnumStatus;
};

const { mutate, isPending } = useMutation({
  mutationFn: ({
    docId,
    status,
    operation,
  }: {
    docId: string;
    status?: string;
    operation: "move" | "delete";
  }) => {
    if (operation === "move") {
      return DB.updateDocument(config.public.dbId, config.public.collectionDeals, docId, { status });
    } else if (operation === "delete") {
      return DB.deleteDocument(config.public.dbId, config.public.collectionDeals, docId);
    }
  },
  onSuccess(data) {
    refetch();
  },
});

function handleDragStart(card: ICard, column: IColumn) {
  dragCardRef.value = card;
  sourceColumnRef.value = column;
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(targetColumn: IColumn) {
  if (dragCardRef.value && sourceColumnRef.value) {
    mutate({
      docId: dragCardRef.value.id,
      status: targetColumn.id,
      operation: "move",
    });
  }
}

const store = useDealSlideStore();
</script>

<template>
  <div class="main">
    <h2 class="text-xl font-bold mb-10">Заказы</h2>
    <UiError v-if="isError">Ошибка загрузки данных!</UiError>
    <UiLoader v-else-if="isLoading"></UiLoader>
    <div v-else>
      <div class="grid grid-cols-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16" @click="store.clear()">
        <div
          v-for="(column, index) in data"
          :key="column.id"
          @dragover="handleDragOver"
          @drop="() => handleDrop(column)"
          class="min-h-[30%]"
        >
          <div
            class="rounded-xl p-3 shadow-md mb-10 text-lg text-center bg-cardDeepColor"
          >
            {{ column.name }}
          </div>
          <KanbanCreateDeal
            :refetch="refetch"
            :status="column.id"
          ></KanbanCreateDeal>
          <div
            class="rounded-xl p-5 shadow-md cursor-grab mb-10"
            title="Тяните для перетаскивания карточки. Нажмите, чтобы узнать подробности заказа"
            draggable="true"
            @dragstart="() => handleDragStart(card, column)"
            v-for="card in column.items"
            :key="card.id"
            :class="{
              'bg-cardLightColor': card.status === 'Новые',
              'bg-cardPastelColor': card.status === 'На согласовании',
              'bg-cardMediumColor': card.status === 'В работе',
              'bg-cardDarkColor': card.status === 'На проверке',
              'bg-cardDeepColor': card.status === 'Готово',
            }"
            @click="store.set(card)"
          >
            <div class="flex justify-between items-center">
              <p class="text-sm">
                {{ dayjs(card.$createdAt).format("DD MMMM YYYY") }}
              </p>
              <Icon
                name="ei:close-o"
                class="text-xl cursor-pointer"
                @click="mutate({ docId: card.id, operation: 'delete' })"
                @click.stop
                title="Удалить заказ"
              ></Icon>
            </div>
            <h2 class="text-xl font-bold mt-2">
              {{ card.name }}
            </h2>
            <h3 class="text-lg mt-1">
              Цена: {{ convertCurrency(card.price) }}
            </h3>
            <p class="text-sm mt-2 mb-3">
              Компания: {{ card.companyName }}
            </p>
          </div>
        </div>
      </div>
      <KanbanSlideover></KanbanSlideover>
    </div>
  </div>
</template>
