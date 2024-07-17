import { useQuery } from "@tanstack/vue-query";
import type { IDeal } from "@/types/deals.types";
import { KANBAN_DATA } from "./kanban.data";
import type { IColumn } from "./kanban.types";

export function useKanbanQuery() {
  const config = useRuntimeConfig();
  return useQuery({
    queryKey: ["deals"],
    queryFn: () =>
      DB.listDocuments(config.public.dbId, config.public.collectionDeals),
    select(data) {
      const newBoard: IColumn[] = KANBAN_DATA.map((column) => ({
        ...column,
        items: [],
      }));

      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((col) => col.id === deal.status);
        if (column) {
          column.items.push({
            $createdAt: deal.$createdAt,
            id: deal.$id,
            name: deal.name,
            price: deal.price,
            companyName: deal.customer ? deal.customer.name : "N/A",
            status: column.name,
          });
        }
      }

      return newBoard;
    },
  });
}
