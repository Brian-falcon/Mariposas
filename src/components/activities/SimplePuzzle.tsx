"use client";

import { Activity } from "@/types";
import { ImageSlicedPuzzle } from "./ImageSlicedPuzzle";

export function SimplePuzzle({ activity }: { activity: Activity }) {
  return <ImageSlicedPuzzle activity={activity} />;
}
