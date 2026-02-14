import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { useNotes } from "../hooks/useNotes";

describe("useNotes", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with an empty array", () => {
    const { result } = renderHook(() => useNotes());
    expect(result.current.notes).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it("should add a note", () => {
    const { result } = renderHook(() => useNotes());

    act(() => {
      result.current.addNote({
        title: "Test Note",
        content: "This is a test note.",
        reference: "John 3:16",
      });
    });

    expect(result.current.notes).toHaveLength(1);
    expect(result.current.notes[0].title).toBe("Test Note");
    expect(result.current.notes[0].content).toBe("This is a test note.");
    expect(result.current.notes[0].reference).toBe("John 3:16");
    expect(result.current.notes[0].id).toBeDefined();
    expect(result.current.notes[0].date).toBeDefined();
    expect(result.current.notes[0].updatedAt).toBeDefined();
  });

  it("should update a note", () => {
    const { result } = renderHook(() => useNotes());

    let noteId = "";
    act(() => {
      const note = result.current.addNote({
        title: "Original Title",
        content: "Original Content",
      });
      noteId = note.id;
    });

    act(() => {
      result.current.updateNote(noteId, {
        title: "Updated Title",
        content: "Updated Content",
      });
    });

    expect(result.current.notes[0].title).toBe("Updated Title");
    expect(result.current.notes[0].content).toBe("Updated Content");
  });

  it("should delete a note", () => {
    const { result } = renderHook(() => useNotes());

    let noteId = "";
    act(() => {
      const note = result.current.addNote({
        title: "To Be Deleted",
        content: "Delete me",
      });
      noteId = note.id;
    });

    expect(result.current.notes).toHaveLength(1);

    act(() => {
      result.current.deleteNote(noteId);
    });

    expect(result.current.notes).toHaveLength(0);
  });
});
