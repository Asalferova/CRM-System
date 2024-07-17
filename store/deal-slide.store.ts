import type { ICard } from "@/components/kanban/kanban.types";
import { nextTick } from "vue";

const defaultValue: {
  card: ICard | null;
  isOpen: boolean;
} = {
  card: null,
  isOpen: false,
};

export const useDealSlideStore = defineStore("deal-slide", {
  state: () => defaultValue,
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(card: ICard) {
      if (this.card === card) {
        this.clear();
      } else {
        this.clear();
        setTimeout(() => {
          this.$patch({ card, isOpen: true });
        }, 0);
      }
    },
  },
});
