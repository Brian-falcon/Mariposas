"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type FontSize = "small" | "medium" | "large";
export type ColorScheme = "default" | "high-contrast" | "dark";

type AccessibilityPrefs = {
  fontSize: FontSize;
  colorScheme: ColorScheme;
  reducedMotion: boolean;
  largeButtons: boolean;
};

type AccessibilityContextType = AccessibilityPrefs & {
  setFontSize: (s: FontSize) => void;
  setColorScheme: (s: ColorScheme) => void;
  setReducedMotion: (v: boolean) => void;
  setLargeButtons: (v: boolean) => void;
  reset: () => void;
};

const STORAGE_KEY = "mariposas_accessibility";
const defaults: AccessibilityPrefs = {
  fontSize: "medium",
  colorScheme: "default",
  reducedMotion: false,
  largeButtons: true,
};

function loadPrefs(): AccessibilityPrefs {
  if (typeof window === "undefined") return defaults;
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      const parsed = JSON.parse(s);
      return { ...defaults, ...parsed };
    }
  } catch {}
  return defaults;
}

function savePrefs(prefs: AccessibilityPrefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  applyToDocument(prefs);
}

function applyToDocument(prefs: AccessibilityPrefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.fontSize = prefs.fontSize;
  root.dataset.colorScheme = prefs.colorScheme;
  root.dataset.reducedMotion = prefs.reducedMotion ? "true" : "false";
  root.dataset.largeButtons = prefs.largeButtons ? "true" : "false";
}

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<AccessibilityPrefs>(defaults);

  useEffect(() => {
    const loaded = loadPrefs();
    setPrefs(loaded);
    applyToDocument(loaded);
  }, []);

  const update = (partial: Partial<AccessibilityPrefs>) => {
    const next = { ...prefs, ...partial };
    setPrefs(next);
    savePrefs(next);
  };

  const value: AccessibilityContextType = {
    ...prefs,
    setFontSize: (fontSize) => update({ fontSize }),
    setColorScheme: (colorScheme) => update({ colorScheme }),
    setReducedMotion: (reducedMotion) => update({ reducedMotion }),
    setLargeButtons: (largeButtons) => update({ largeButtons }),
    reset: () => {
      setPrefs(defaults);
      savePrefs(defaults);
    },
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility debe usarse dentro de AccessibilityProvider");
  return ctx;
}
