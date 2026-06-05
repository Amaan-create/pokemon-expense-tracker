import { useQuery } from "@tanstack/react-query";

import { getSummary } from "../services/expenseService";

export const useSummary = () => {
  return useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });
};
