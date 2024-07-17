<script lang="ts" setup>
import { useMutation } from "@tanstack/vue-query";
import type { ID } from "appwrite";
import { defineProps } from "vue";
import type { IDeal } from "@/types/deals.types";

const config = useRuntimeConfig();
const isOpenForm = ref<boolean>(false);

interface IDealFormState extends Pick<IDeal, "name" | "price"> {
  customer: {
    email: string;
    name: string;
  };
  status: string;
}

const props = defineProps({
  status: {
    type: String,
    default: "",
  },
  refetch: {
    type: Function,
  },
});

const name = ref("");
const price = ref(0);
const customerName = ref("");
const customerEmail = ref("");

const { mutate, isPending, isError } = useMutation({
  mutationKey: ["create a new deal"],
  mutationFn: (data: IDealFormState) =>
    DB.createDocument(
      config.public.dbId,
      config.public.collectionDeals,
      ID.unique(),
      data
    ),
  onSuccess(data) {
    props.refetch && props.refetch();
  },
});

const onSubmit = () => {
  const values: IDealFormState = {
    name: name.value,
    price: price.value,
    customer: {
      email: customerEmail.value,
      name: customerName.value,
    },
    status: props.status,
  };
  mutate(values);
};
</script>
<template>
  <div>
    <div class="flex justify-center pb-5">
      <Icon
        name="ei:arrow-up"
        v-if="isOpenForm"
        @click="isOpenForm = !isOpenForm"
        class="text-xl cursor-pointer"
        title="Свернуть форму"
      ></Icon>
      <Icon
        name="ei:plus"
        v-if="!isOpenForm"
        @click="isOpenForm = !isOpenForm"
        class="text-xl cursor-pointer"
        title="Создать новый заказ"
      ></Icon>
    </div>
    <form @submit.prevent="onSubmit" v-if="isOpenForm" class="text-center mb-5">
      <UiInput placeholder="Наименование" v-model="name" />
      <UiInput type="number" placeholder="Цена" v-model="price" />
      <UiInput placeholder="Компания" v-model="customerName" />
      <UiInput v-model="customerEmail" placeholder="Почта" />
      <UiLoader v-if="isPending">Отправка...</UiLoader>
      <UiError v-if="isError">Ошибка!</UiError>
      <UiButton type="submit">Добавить</UiButton>
    </form>
  </div>
</template>
