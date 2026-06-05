import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, expense }) => updateExpense(id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });
};
