import { useQuery } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";
import { useDealSlideStore } from "~/store/deal-slide.store";

export function useComments() {
  const store = useDealSlideStore();
  const cardId = store.card?.id || "";

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: () =>
      DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
  });
}
