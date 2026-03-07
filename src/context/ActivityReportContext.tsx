"use client";

import { createContext, useContext, useRef, useCallback, ReactNode } from "react";
import { useAuth } from "./AuthContext";

type ReportComplete = (opts?: { correct?: boolean; score?: number }) => void;

const ActivityReportContext = createContext<{
  reportComplete: ReportComplete;
  activityId: string;
  activityTitle: string;
  category: string;
} | null>(null);

export function ActivityReportProvider({
  children,
  activityId,
  activityTitle,
  category,
}: {
  children: ReactNode;
  activityId: string;
  activityTitle: string;
  category: string;
}) {
  const { recordActivityComplete, student } = useAuth();
  const startedAt = useRef(Date.now());
  const reported = useRef(false);

  const reportComplete = useCallback(
    (opts?: { correct?: boolean; score?: number }) => {
      if (!student || reported.current) return;
      reported.current = true;
      recordActivityComplete({
        activityId,
        activityTitle,
        category,
        correct: opts?.correct,
        score: opts?.score,
        startedAt: startedAt.current,
      });
    },
    [student, activityId, activityTitle, category, recordActivityComplete]
  );

  return (
    <ActivityReportContext.Provider
      value={{ reportComplete, activityId, activityTitle, category }}
    >
      {children}
    </ActivityReportContext.Provider>
  );
}

export function useActivityReport() {
  return useContext(ActivityReportContext);
}
