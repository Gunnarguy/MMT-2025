import { useCallback, useEffect, useState } from "react";

/**
 * State that survives a refresh, stored in localStorage.
 *
 * This is the app's *entire* persistence story on purpose — the itinerary is
 * fixed, so the only things worth remembering are which checkboxes you ticked
 * and which theme you like. No accounts, no sync, no server.
 */
export function useLocalState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Private browsing / quota. Losing a checkbox is not worth a crash.
    }
  }, [key, value]);

  return [value, setValue];
}

/** A set of checked ids, as a plain object so it serializes cleanly. */
export function useChecklist(key) {
  const [checked, setChecked] = useLocalState(key, {});

  const toggle = useCallback(
    (id) =>
      setChecked((prev) => {
        const next = { ...prev };
        if (next[id]) delete next[id];
        else next[id] = true;
        return next;
      }),
    [setChecked],
  );

  const reset = useCallback(() => setChecked({}), [setChecked]);

  return { checked, toggle, reset, count: Object.keys(checked).length };
}
