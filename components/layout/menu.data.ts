interface IMenuItem {
  name: string;
  url: string;
  icon: string;
}

export const MENU: IMenuItem[] = [
  {
    name: "Заказы",
    url: "/",
    icon: "clarity:tasks-line",
  },
  {
    name: "Клиенты",
    url: "/customers",
    icon: "bi:people",
  },
  {
    name: "Отчёт",
    url: "/report",
    icon: "carbon:report",
  },
  {
    name: "Настройки",
    url: "/settings",
    icon: "solar:settings-outline",
  },
  {
    name: "Справка",
    url: "/help",
    icon: "material-symbols:help-outline",
  },
];
