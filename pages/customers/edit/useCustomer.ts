import { useMutation, useQuery } from "@tanstack/vue-query";
import type { ICustomer } from "@/types/deals.types";
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from "~/app.constants";

export interface ICustomerFormState
  extends Pick<ICustomer, "avatar_url" | "email" | "name" | "from_source"> {}

export function useCustomer() {
  const route = useRoute();
  const customerId = route.params.id as string;
  const customerNameRef = ref<string>();
  const customerEmailRef = ref<string>();
  const fromSourceRef = ref<string>();
  const customerAvatarUrl = ref<string>();
  const errorMessage = ref<string | null>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ["get customer", customerId],
    queryFn: () =>
      DB.getDocument(
        DB_ID,
        COLLECTION_CUSTOMERS,
        customerId
      ),
  });

  watch(isSuccess, () => {
    const inintialData = data.value as unknown as ICustomerFormState;
    customerNameRef.value = inintialData.name;
    customerEmailRef.value = inintialData.email;
    fromSourceRef.value = inintialData.from_source;
    customerAvatarUrl.value = inintialData.avater_url;
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["update customer", customerId],
    mutationFn: (data: ICustomerFormState) =>
      DB.updateDocument(
        DB_ID,
        COLLECTION_CUSTOMERS,
        customerId,
        data
      ),
    onError: (error) => {
      errorMessage.value = error.message;
    },
    onSettled: () => {
      errorMessage.value = null;
    },
  });

  const onSubmit = () => {
    const values: ICustomerFormState = {
      name: customerNameRef.value,
      email: customerEmailRef.value,
      from_source: fromSourceRef.value || "",
      avater_url: customerAvatarUrl.value,
    };
    mutate(values);
  };

  const {
    mutate: uploadImage,
    isPending: isUploadImagePending,
    error: uploadImageError,
  } = useMutation({
    mutationKey: ["upload image"],
    mutationFn: (file: File) =>
      storage.createFile(STORAGE_ID, ID.unique(), file),
    onSuccess(data) {
      const response = storage.getFileDownload(
        STORAGE_ID,
        data.$id
      );
      customerAvatarUrl.value = response.href;
    },
    onError: (error) => {
      errorMessage.value = error.message;
    },
    onSettled: () => {
      errorMessage.value = null;
    },
  });

  return {
    data,
    isSuccess,
    mutate,
    isPending,
    customerNameRef,
    customerEmailRef,
    fromSourceRef,
    customerAvatarUrl,
    onSubmit,
    uploadImage,
    isUploadImagePending,
    errorMessage,
    uploadImageError,
  };
}
