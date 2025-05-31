"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function MobileSearchBar() {
  const [show, setShow] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setShow(data.products);
    };
    fetchAllProducts();
  }, []);

  const filtered = show.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-4 md:hidden mt-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 p-3 rounded-full border border-gray-300 shadow-sm w-full bg-white">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent text-sm"
        />
      </div>

      {/* Search Results */}
      {search.trim() !== "" && (
        <ul className="mt-4 bg-white rounded-lg shadow-sm max-h-[300px] overflow-y-auto divide-y divide-gray-100">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <li key={index} className="px-3 py-2 hover:bg-gray-100">
                <Link
                  href={`/${item.name}`}
                  className="block w-full truncate text-sm text-gray-800"
                  title={item.name}
                >
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-center text-gray-500 text-sm">
              No results found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
