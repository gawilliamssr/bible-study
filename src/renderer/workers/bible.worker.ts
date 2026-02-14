import { normalizeBibleData, BiblePayload } from "../lib/bible-utils";

self.onmessage = async (event: MessageEvent) => {
  if (event.data === "load") {
    try {
      const response = await fetch("/bible-kjv.json");
      if (!response.ok) {
        throw new Error("Unable to load Bible data.");
      }
      const payload = (await response.json()) as BiblePayload;
      const data = normalizeBibleData(payload);
      if (!data.books?.length) {
        throw new Error("Bible dataset is missing book content.");
      }
      self.postMessage({ type: "success", data });
    } catch (err) {
      self.postMessage({
        type: "error",
        error: err instanceof Error ? err.message : "Unknown error"
      });
    }
  }
};
