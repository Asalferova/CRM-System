<script lang="ts" setup>
import { account } from "@/utils/appwrite";
import { useAuthStore } from "@/store/auth.store";

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get();
    const avatar = await avatars.getInitials();
    if (user) {
      authStore.set({
        email: user.email,
        status: user.status,
        avatar_url: avatar.href,
        name: user.name,
      });
    }
  } catch (error) {
    router.push("/login");
  } finally {
  }
});
</script>
<template>
  <div>
    <section style="min-height: 100vh" :class="{ grid: authStore.isAuth }">
      <div style="min-width: 300px" class="bg-sidebarBackground">
        <LayoutSidebar v-if="authStore.isAuth" />
      </div>
      <div>
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>
