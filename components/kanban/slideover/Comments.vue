<script lang="ts" setup>
import dayjs from "dayjs";
import { useComments } from "./useComments";
import { useCommentMutation } from "./useCreateComment";
import type { IDeal } from "@/types/deals.types";

const { data, refetch, isLoading, isError: errorData } = useComments();
const { commentRef, writeComment, isError } = useCommentMutation({ refetch });

const card = data as unknown as IDeal;
</script>
<template>
  <div>
    <UiInput
      placeholder="Оставьте комментарий"
      v-model="commentRef"
      @keyup.enter="writeComment"
    />
    <div v-if="card && !isLoading" class="mt-4">
      <div
        v-for="comment in card?.comments"
        :key="comment.$id"
        class="mb-4 flex"
      >
        <Icon
          name="teenyicons:message-solid"
          class="text-sidebarBackground mr-3 text-xl"
        ></Icon>
        <div class="pb-2 bg-sidebarBackground rounded-md p-3">
          Комментарий {{ dayjs(comment.$createdAt).format("HH:mm") }}
          <p class="text-sm">{{ comment.text }}</p>
        </div>
        <UiError v-if="isError">Ошибка!</UiError>
      </div>
    </div>
    <UiLoader v-else>Загрузка комментариев...</UiLoader>
  </div>
</template>
