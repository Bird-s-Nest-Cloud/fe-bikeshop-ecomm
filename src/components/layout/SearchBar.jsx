"use client";

import { useDebounced } from "@/hooks/useDebounced";
import { axiosInstance } from "@/utils/axiosInstance";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounced(searchText, 500);
  const [searchType, setSearchType] = useState("product");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getSearchResults = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/search?q=${debouncedSearch}&type=${searchType}`
      );
      if (!data?.status) {
        throw new Error(data?.status_message);
      }
      setSearchResults(data?.data?.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearch.trim() !== "") {
      getSearchResults();
    }
  }, [debouncedSearch]);

  return (
    <div
      className="relative w-full flex justify-end"
      tabIndex={1}
      onBlur={(e) => {
        // Only hide results if focus is moving outside the component
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setShowResults(false);
        }
      }}
      onFocus={() => setShowResults(true)}
    >
      <div className="flex items-center gap-4 bg-gray-100 rounded-md  w-full max-w-[500px]">
        <div className="pl-2">
          <Search className="text-gray-600" size={18} />
        </div>
        <input
          type="text"
          placeholder="Search Products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-transparent border-none outline-none text-sm w-full text-gray-900"
        />
        <select
          className="bg-gray-600 border-none outline-none text-sm text-white cursor-pointer py-3 px-2 rounded-r-md"
          defaultValue="product"
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="product">Product</option>
          <option value="category">Category</option>
          <option value="brand">Brand</option>
        </select>
      </div>

      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-10">
          {loading ? (
            <div className="p-4 text-center text-gray-600">Loading...</div>
          ) : (
            searchResults.map((result) => (
              <Link
                href={result.url}
                key={result.slug}
                className="block text-gray-600 p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-100 flex gap-1"
              >
                <Image
                  src={result.image}
                  alt={result.title}
                  width={50}
                  height={50}
                  className="inline-block mr-2"
                />
                <div>{result.title}</div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
