"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Student = { id: number; name: string; slug: string };

type AuthContextType = {
  student: Student | null;
  isLoading: boolean;
  login: (student: Student) => void;
  logout: () => void;
  recordActivityComplete: (data: {
    activityId: string;
    activityTitle: string;
    category: string;
    correct?: boolean;
    score?: number;
    startedAt: number;
  }) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mariposas_student");
    if (stored) {
      try {
        const s = JSON.parse(stored) as Student;
        setStudent(s);
      } catch {
        localStorage.removeItem("mariposas_student");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (s: Student) => {
    setStudent(s);
    localStorage.setItem("mariposas_student", JSON.stringify(s));
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem("mariposas_student");
  };

  const recordActivityComplete = async (data: {
    activityId: string;
    activityTitle: string;
    category: string;
    correct?: boolean;
    score?: number;
    startedAt: number;
  }) => {
    if (!student) return;
    const timeSeconds = Math.round((Date.now() - data.startedAt) / 1000);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student.id,
        activityId: data.activityId,
        activityTitle: data.activityTitle,
        category: data.category,
        completed: true,
        correct: data.correct,
        score: data.score,
        startedAt: new Date(data.startedAt).toISOString(),
        completedAt: new Date().toISOString(),
        timeSeconds,
      }),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        student,
        isLoading,
        login,
        logout,
        recordActivityComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
