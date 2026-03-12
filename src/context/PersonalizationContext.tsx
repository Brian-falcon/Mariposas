"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const AVATARS = ["🦋", "🌸", "⭐", "🐶", "🐱", "🦊", "🐻", "🌈", "☀️", "❤️"];
const STORAGE_KEY = "mariposas_avatar";

const PersonalizationContext = createContext<{
  avatar: string;
  setAvatar: (avatar: string) => void;
  avatars: string[];
} | null>(null);

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [avatar, setAvatarState] = useState(AVATARS[0]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && AVATARS.includes(saved)) setAvatarState(saved);
    }
  }, []);

  const setAvatar = (a: string) => {
    if (AVATARS.includes(a)) {
      setAvatarState(a);
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, a);
    }
  };

  return (
    <PersonalizationContext.Provider value={{ avatar, setAvatar, avatars: AVATARS }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const ctx = useContext(PersonalizationContext);
  return ctx ?? { avatar: "🦋", setAvatar: () => {}, avatars: AVATARS };
}
