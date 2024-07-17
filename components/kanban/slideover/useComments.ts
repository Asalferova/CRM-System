import { useQuery } from "@tanstack/vue-query";
import { useDealSlideStore } from "~/store/deal-slide.store";

export function useComments() {
  const config = useRuntimeConfig();
  const store = useDealSlideStore();
  const cardId = store.card?.id || "";

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: () =>
      DB.getDocument(config.public.dbId, config.public.collectionDeals, cardId),
  });
}
