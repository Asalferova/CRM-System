<script lang="ts" setup>
useSeoMeta({
  title: "Help",
});

type RuleSection = {
  title: string;
  rules: string[];
};

const rules = <RuleSection[]>[
  {
    title: "Как пользоваться вкладкой заказы",
    rules: [
      "Карточки можно перетаскивать",
      "При нажатии на карточку, открывается окно с деталями заказа",
      "В деталях заказа можно оставлять комментарии написав комментарий и нажав на кнопку enter",
      "Заказы также можно удалять и добавлять новые",
    ],
  },
  {
    title: "Как пользоваться вкладкой клиенты",
    rules: [
      "При нажатии на кнопку редактировать пользователя, можно заменить информацию по пользователю",
    ],
  },
  {
    title: "Как пользоваться вкладкой отчет",
    rules: [
      "На странице автоматически формируется отчёт за месяц по всем заказам",
      "При нажатии на кнопку сформировать отчет отчет формируется в PDF",
    ],
  },
  {
    title: "Как пользоваться вкладкой настройки",
    rules: ["Есть кнопки управления темой приложения и размером шрифта"],
  },
];
</script>
<template>
  <div class="main">
    <h2 class="text-xl font-bold mb-10">Справка</h2>
    <div v-for="(item, index) in rules" :key="index">
      <details open class="border-t border-gray-300">
        <summary
          class="bg-sidebarBackground p-2 cursor-pointer rounded mb-10 text-lg flex flex-row-reverse justify-between"
        >
          <Icon
            name="solar:round-alt-arrow-down-linear"
            alt="Icon"
            class="mr-2 text-2xl text-icon"
          ></Icon>
          <h2>{{ item.title }}</h2>
        </summary>
        <ul class="list-disc list-inside m-4">
          <li v-for="(rule, ruleIndex) in item.rules" :key="ruleIndex">
            {{ rule }}
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>

<style scoped>
details > summary {
  list-style: none;
}

details > summary::-webkit-details-marker {
  display: none;
}
</style>
