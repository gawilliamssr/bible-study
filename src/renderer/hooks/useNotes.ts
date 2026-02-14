import { useState, useEffect, useCallback } from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
  reference?: string;
  updatedAt: string;
};

const STORAGE_KEY = "bible-app-notes";

const generateId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load notes from local storage on mount
  useEffect(() => {
    const loadNotes = () => {
      try {
        const storedNotes = localStorage.getItem(STORAGE_KEY);
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error("Failed to load notes from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes to storage:", error);
      }
    }
  }, [notes, isLoading]);

  const addNote = useCallback((note: Omit<Note, "id" | "date" | "updatedAt">) => {
    const newNote: Note = {
      ...note,
      id: generateId(),
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Omit<Note, "id" | "date" | "updatedAt">>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }, []);

  return {
    notes,
    isLoading,
    addNote,
    updateNote,
    deleteNote,
  };
};
