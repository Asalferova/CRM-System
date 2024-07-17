<script lang="ts" setup>
import { useDealSlideStore } from "@/store/deal-slide.store";

const store = useDealSlideStore();
</script>
<template>
  <div>
    <div
      v-if="store.isOpen"
      class="slide-over pt-10 p-3 bg-white rounded-lg shadow-md"
    >
      <div>
        <KanbanSlideoverTop> </KanbanSlideoverTop>
        <KanbanSlideoverComments> </KanbanSlideoverComments>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-over {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  background-color: #fff;
  z-index: 999;
  transition: transform 0.3s ease;
  transform: translateX(0);
  overflow: auto;
}
</style>
