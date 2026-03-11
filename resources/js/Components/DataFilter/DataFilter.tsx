import React from "react";

export default function DataFilter({
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
  sortOptions
}) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
    </div>
  );
}