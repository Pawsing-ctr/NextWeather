"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { ISearch, searchData } from "@/app/data/pages";
import "./SearchBlock.css";

export const SearchBlock = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ISearch[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const findFilter = (query: string) => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtred = searchData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtred);
    setIsOpen(true);
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    findFilter(value);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
      <div className="search-container">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="search-input-wrapper">
            <input
              onChange={handleClick}
              type="text"
              className="search-input"
              placeholder="Search the MEX"
              value={query}
            />
          </div>
          {query ? (
            <button
              type="button"
              className="search-clear-button"
              onClick={clearSearch}
            >
              <X size={20} />
            </button>
          ) : null}
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {isOpen && (
          <div className="search-results-container">
            {results.length > 0 ? (
              <ul className="search-results-list">
                {results.map((item) => (
                  <li key={item.id} className="search-result-item">
                    <Link href={item.link} className="search-link">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="search-no-results">
                Sorry, there are no results for <strong>{query}</strong>
              </p>
            )}
          </div>
        )}
      </div>
  );
};
