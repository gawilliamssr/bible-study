import { useState, useEffect } from "react";
import { BibleData } from "../../types";
import { fetchBibleData } from "../utils/bible-api";

export const useBible = () => {
  const [bible, setBible] = useState<BibleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadBible = async () => {
      try {
        const data = await fetchBibleData();
        if (mounted) {
          setBible(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBible();

    return () => {
      mounted = false;
    };
  }, []);

  return { bible, loading, error };
};
