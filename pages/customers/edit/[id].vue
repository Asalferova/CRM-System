<script lang="ts" setup>
import { useCustomer } from "./useCustomer";
import type { ICustomerFormState } from "./useCustomer";

useSeoMeta({
  title: "Edit Customer",
});

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}
const {
  data,
  isSuccess,
  onSubmit,
  customerNameRef,
  customerEmailRef,
  fromSourceRef,
  isPending,
  uploadImage,
  isUploadImagePending,
  customerAvatarUrl,
  errorMessage,
  uploadImageError,
} = useCustomer();
</script>
<template>
  <div class="main">
    <h1 class="text-xl font-bold mb-10">Редактирование: {{ (data as unknown as ICustomerFormState)?.name }}</h1>
    <form @submit.prevent>
      <UiInput placeholder="Компания" v-model="customerNameRef" />
      <UiInput type="email" v-model="customerEmailRef" placeholder="Почта" />
      <UiInput v-model="fromSourceRef" placeholder="Откуда пришел" />

      <img
        v-if="customerAvatarUrl || isUploadImagePending"
        :src="customerAvatarUrl"
        alt=""
        width="50"
        height="50"
        class="rounded-full"
      />
      <div>
        <label>
          <div>Логотип</div>
          <UiInput
            type="file"
            :onchange="(e:InputFileEvent) => e?.target?.files?.length && uploadImage(e.target.files[0])"
            :disabled="isUploadImagePending"
          />
        </label>
      </div>
      <UiButton @click="onSubmit" :disabled="isPending">{{
        isPending ? "Загрузка" : "Сохранить"
      }}</UiButton>
      <UiError v-if="errorMessage || uploadImageError">ошибка!</UiError>
    </form>
  </div>
</template>
