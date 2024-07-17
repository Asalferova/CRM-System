<script lang="ts" setup>
useSeoMeta({
  title: "Settings",
});

function setTheme(themeName: string) {
  document.body.className = themeName;
}
function setFontSise(fontSize: string) {
  document.documentElement.style.fontSize = fontSize;
}
</script>

<template>
  <div class="main">
    <h2 class="text-xl font-bold mb-10">Настройки</h2>
    <p>Изменить тему:</p>
    <div class="flex flex-wrap gap-20 mb-10">
      <div class="theme-preview">
        <UiButton @click="() => setTheme('theme-custom')"
          >Тема по умолчанию</UiButton
        >
        <div class="colors">
          <div
            class="color-block theme-custom"
            style="background-color: var(--background)"
          ></div>
          <div
            class="color-block theme-custom"
            style="background-color: var(--text)"
          ></div>
          <div
            class="color-block theme-custom"
            style="background-color: var(--sidebarBackground)"
          ></div>
          <div
            class="color-block theme-custom"
            style="background-color: var(--icon)"
          ></div>
        </div>
      </div>
      <div class="theme-preview">
        <UiButton @click="() => setTheme('theme-light')">Светлая тема</UiButton>
        <div class="colors">
          <div
            class="color-block theme-light"
            style="background-color: var(--background)"
          ></div>
          <div
            class="color-block theme-light"
            style="background-color: var(--text)"
          ></div>
          <div
            class="color-block theme-light"
            style="background-color: var(--sidebarBackground)"
          ></div>
          <div
            class="color-block theme-light"
            style="background-color: var(--icon)"
          ></div>
        </div>
      </div>
      <div class="theme-preview">
        <UiButton @click="() => setTheme('theme-green')">Зеленая тема</UiButton>
        <div class="colors">
          <div
            class="color-block theme-green"
            style="background-color: var(--background)"
          ></div>
          <div
            class="color-block theme-green"
            style="background-color: var(--text)"
          ></div>
          <div
            class="color-block theme-green"
            style="background-color: var(--sidebarBackground)"
          ></div>
          <div
            class="color-block theme-green"
            style="background-color: var(--icon)"
          ></div>
        </div>
      </div>
      <div class="theme-preview">
        <UiButton @click="() => setTheme('theme-dark')">Темная тема</UiButton>
        <div class="colors">
          <div
            class="color-block theme-dark"
            style="background-color: var(--background)"
          ></div>
          <div
            class="color-block theme-dark"
            style="background-color: var(--text)"
          ></div>
          <div
            class="color-block theme-dark"
            style="background-color: var(--sidebarBackground)"
          ></div>
          <div
            class="color-block theme-dark"
            style="background-color: var(--icon)"
          ></div>
        </div>
      </div>
    </div>
    <p>Изменить размер шрифта:</p>
    <div class="flex flex-col">
      <UiButton @click="() => setFontSise('14px')">Маленький шрифт</UiButton>
      <UiButton @click="() => setFontSise('16px')">Средний шрифт</UiButton>
      <UiButton @click="() => setFontSise('18px')">Большой шрифт</UiButton>
    </div>
  </div>
</template>

<style scoped>
.colors {
  @apply border grid grid-cols-2 mt-10 rounded;
}
.color-block {
  width: 150px;
  height: 150px;
  display: inline-block;
}
</style>
