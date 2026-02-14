import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useBible } from "../hooks/useBible";
import { fetchBibleData } from "../utils/bible-api";

// Mock the API utility
vi.mock("../utils/bible-api", () => ({
  fetchBibleData: vi.fn(),
}));

describe("useBible", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return loading state initially", async () => {
    // Mock fetchBibleData to never resolve immediately (simulating loading)
    (fetchBibleData as any).mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useBible());

    expect(result.current.loading).toBe(true);
    expect(result.current.bible).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should return bible data on success", async () => {
    const mockData = { translation: "KJV", books: [] };
    (fetchBibleData as any).mockResolvedValue(mockData);

    const { result } = renderHook(() => useBible());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.bible).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should return error on failure", async () => {
    const error = new Error("Network error");
    (fetchBibleData as any).mockRejectedValue(error);

    const { result } = renderHook(() => useBible());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Network error");
    expect(result.current.bible).toBeNull();
  });
});
