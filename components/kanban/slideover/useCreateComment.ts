import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_COMMENTS, DB_ID } from "~/app.constants";
import { useDealSlideStore } from "~/store/deal-slide.store";

export function useCommentMutation({ refetch }: { refetch: () => void }) {
  const store = useDealSlideStore();
  const commentRef = ref<string>();

  const { mutate, isError } = useMutation({
    mutationKey: ["add comment", commentRef.value],
    mutationFn: () =>
      DB.createDocument(
        DB_ID,
        COLLECTION_COMMENTS,
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
