import { useState, useMemo } from "react";

interface UseDataFilterOptions {
  searchFields?: string[];
  defaultSort?: { field: string; order: string } | null;
}

export function useDataFilter(data: Record<string, any>[], options: UseDataFilterOptions = {}) {
  const { searchFields = [], defaultSort = null } = options;

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(defaultSort?.field || null);
  const [order, setOrder] = useState(defaultSort?.order || "asc");

  const filteredData = useMemo(() => {
    let result = [...data];

    // SEARCH
    if (search) {
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    // SORT
    if (sortBy) {
      result.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, search, sortBy, order, searchFields]);

  return {
    search,
    setSearch,
    sortBy,
    setSortBy,
    order,
    setOrder,
    filteredData
  };
}