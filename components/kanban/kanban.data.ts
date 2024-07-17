import { EnumStatus } from "@/types/deals.types";
import type { IColumn } from "./kanban.types";

export const KANBAN_DATA: IColumn[] = [
  {
    id: EnumStatus.todo,
    name: "Новые",
    items: [],
  },
  {
    id: EnumStatus["to-be-agreed"],
    name: "На согласовании",
    items: [],
  },
  {
    id: EnumStatus["in-progress"],
    name: "В работе",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "На проверке",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "Готово",
    items: [],
  },
];
