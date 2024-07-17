<script lang="ts" setup>
import { useAuthStore } from "@/store/auth.store";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, minLength } from "@vuelidate/validators";
useSeoMeta({
  title: "Login",
});

const formData = reactive({
  name: "",
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  };
});

const v$ = useVuelidate(rules, formData);

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const errorMessage = ref("");

const login = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    loading.value = true;
    try {
      await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );
      const response = await account.get();
      const avatar = await avatars.getInitials();
      if (response) {
        authStore.set({
          email: response.email,
          status: response.status,
          avatar_url: avatar.href,
          name: response.name,
        });
      }
      formData.email = "";
      formData.password = "";
      formData.name = "";
      await router.push("/");
    } catch (error) {
      errorMessage.value = "Ошибка при входе: " + error.message;
    } finally {
      loading.value = false;
    }
  }
};

const register = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    loading.value = true;
    try {
      await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.name
      );
      await login();
    } catch (error) {
      errorMessage.value = "Ошибка при регистрации: " + error.message;
    } finally {
      loading.value = false;
    }
  }
};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen w-full bg-cardPastelColor">
    <div class="w-1/3 p-6 rounded-lg shadow-lg bg-cardMediumColor">
      <h1 class="text-2xl font-bold text-center mb-5">Вход / Регистрация</h1>
      <p class="mb-4">Тестовые данные (почта: test@gmail.com пароль: 12312312)</p>
      <form class="flex flex-col">
        <UiInput v-model="formData.name" placeholder="Имя" />
        <UiInput
          type="email"
          v-model="formData.email"
          placeholder="Почта"
          @change="v$.email.$touch"
          :class="{ 'border-red-500 focus:border-red-500': v$.email.$error }"
        />
        <UiError v-if="v$.email.$error"> Почта указана неверно </UiError>
        <UiInput
          type="password"
          v-model="formData.password"
          placeholder="Пароль"
          @change="v$.email.$touch"
          :class="{ 'border-red-500 focus:border-red-500': v$.password.$error }"
        />
        <UiError v-if="v$.password.$error">
          Пароль обязателен не менее 8 символов
        </UiError>
        <UiError v-if="errorMessage">{{ errorMessage }}</UiError>
        <UiLoader v-if="loading">Отправка...</UiLoader>
        <div class="flex justify-center gap-10">
          <UiButton type="submit" @click.prevent="login" class="bg-icon"
            >Войти</UiButton
          >
          <UiButton type="submit" @click.prevent="register" class="bg-icon"
            >Зарегистрироваться</UiButton
          >
        </div>
      </form>
    </div>
  </div>
</template>
