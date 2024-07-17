<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";

useSeoMeta({
  title: "Personal Area",
});

const authStore = useAuthStore();
const router = useRouter();
const nameRef = ref("");
const emailRef = ref("");
const avatarRef = ref("");

watchEffect(() => {
  if (authStore.user) {
    nameRef.value = authStore.user.name;
    emailRef.value = authStore.user.email;
    avatarRef.value = authStore.user.avatar_url;
  }
});

const logout = async () => {
  await account.deleteSession("current");
  authStore.clear();
  await router.push("/login");
};
</script>
<template>
  <div>
    <aside class="flex flex-col items-center fixed top-0 h-full">
      <NuxtLink to="/" class="block pt-8 pb-5">
        <h1 class="text-xl font-bold text-center">CRM</h1>
      </NuxtLink>
      <div class="flex flex-col items-center gap-4 px-20 mb-20">
        <img
          :src="avatarRef ? avatarRef : ''"
          class="rounded-full"
          width="70"
          height="70"
          alt="avatar"
        />
        <div class="flex flex-col items-center">
          <p class="font-bold text-lg">{{ nameRef }}</p>
          <p class="px-2 py-1">{{ emailRef }}</p>
        </div>
      </div>
      <LayoutMenu></LayoutMenu>
      <button @click="logout" class="p-5 absolute left-1 flex items-center">
        <Icon
          name="solar:logout-2-outline"
          class="mr-5 text-icon text-xl"
        ></Icon>
      </button>
    </aside>
  </div>
</template>
