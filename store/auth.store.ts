interface IAuthStore {
  email: string;
  name: string;
  status: boolean;
  avatar_url: string;
}

const defaultValue: { user: IAuthStore } = {
  user: {
    email: "",
    name: "",
    status: false,
    avatar_url: "",
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,
  getters: {
    isAuth: (state) => state.user.status,
  },
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(input: IAuthStore) {
      this.$patch({ user: input });
    },
  },
});
