import { useMutation } from "@tanstack/vue-query";
import { useDealSlideStore } from "~/store/deal-slide.store";

export function useCommentMutation({ refetch }: { refetch: () => void }) {
  const config = useRuntimeConfig();
  const store = useDealSlideStore();
  const commentRef = ref<string>();

  const { mutate, isError } = useMutation({
    mutationKey: ["add comment", commentRef.value],
    mutationFn: () =>
      DB.createDocument(
        config.public.dbId,
        config.public.collectionComments,
        ID.unique(),
        {
          text: commentRef.value,
          deal: store.card?.id,
        }
      ),
    onSuccess: () => {
      refetch();
      commentRef.value = "";
    },
  });
  const writeComment = () => {
    if (!commentRef.value) return;
    mutate();
  };

  return {
    writeComment,
    commentRef,
    isError,
  };
}
