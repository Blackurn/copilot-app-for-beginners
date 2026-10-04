import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      searchTerm: "hobbit"
    });

    expect(results.map((book) => book.title)).toEqual(["The Hobbit"]);
  });

  it.each([
    ["title", "The Hobbit", "THE HOBBIT", "hobbit"],
    ["author", "The Hobbit", "TOLKIEN", "tolkien"]
  ])("returns the same results for uppercase and lowercase %s searches", (_field, title, upper, lower) => {
    const upperResults = filterBooks(books, { ...defaultFilters, searchTerm: upper });
    const lowerResults = filterBooks(books, { ...defaultFilters, searchTerm: lower });

    expect(upperResults.map((book) => book.title)).toEqual([title]);
    expect(upperResults).toEqual(lowerResults);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
