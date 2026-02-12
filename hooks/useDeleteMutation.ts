import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface DeleteMutationVariables {
    ids: string[];
    deleteType: string;
}

const useDeleteMutation = (
    queryKey: string | string[],
    deleteEndpoint: string
): UseMutationResult<unknown, unknown, DeleteMutationVariables> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ ids, deleteType }: DeleteMutationVariables) => {
            const { data: response } = await axios({
                url: deleteEndpoint,
                method: deleteType === 'PD' ? 'DELETE' : 'PUT',
                data: { ids, deleteType },
            });
            if (!response.success) {
                return toast.error(response.message);
            }
            return response;
        },

        onSuccess: (data: unknown) => {
            const message = (data as { message?: string })?.message || "Deleted successfully";
            toast.success(message);
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
        onError: (error: unknown) => {
            let errorMessage = "Something went wrong.";
            if (error && typeof error === 'object' && 'message' in error) {
                errorMessage = (error as { message: string }).message;
            }
            toast.error(`mutation fail ${errorMessage}`);
            return console.error('onError',error)
        }
    });
};

export default useDeleteMutation;