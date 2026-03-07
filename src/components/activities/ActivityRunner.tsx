"use client";

import { Activity } from "@/types";
import { ActivityReportProvider } from "@/context/ActivityReportContext";
import { MemorizeImages } from "./MemorizeImages";
import { MemoryPairs } from "./MemoryPairs";
import { RememberSequence } from "./RememberSequence";
import { RecognizeColors } from "./RecognizeColors";
import { IdentifyShapes } from "./IdentifyShapes";
import { FindDifference } from "./FindDifference";
import { MatchImageWord } from "./MatchImageWord";
import { CountObjects } from "./CountObjects";
import { AddImages } from "./AddImages";
import { SubtractImages } from "./SubtractImages";
import { ChooseNumber } from "./ChooseNumber";
import { RecognizeLetters } from "./RecognizeLetters";
import { CompleteWord } from "./CompleteWord";
import { MatchWordImage } from "./MatchWordImage";
import { RecognizeSound } from "./RecognizeSound";
import { ChooseSound } from "./ChooseSound";
import { DragDrop } from "./DragDrop";
import { OrderObjects } from "./OrderObjects";
import { FollowSequence } from "./FollowSequence";
import { TraceNumber } from "./TraceNumber";
import { SimplePuzzle } from "./SimplePuzzle";
import { AssociationGame } from "./AssociationGame";
import { WordSearch } from "./WordSearch";
import { Crossword } from "./Crossword";
import { ColoringGame } from "./ColoringGame";
import { MandalaColoring } from "./MandalaColoring";
import { ShieldPuzzle } from "./ShieldPuzzle";
import { EmojiPuzzle } from "./EmojiPuzzle";

const componentMap: Record<string, React.ComponentType<{ activity: Activity }>> = {
  "memorize-images": MemorizeImages,
  "memory-pairs": MemoryPairs,
  "remember-sequence": RememberSequence,
  "recognize-colors": RecognizeColors,
  "identify-shapes": IdentifyShapes,
  "find-difference": FindDifference,
  "match-image-word": MatchImageWord,
  "match-word-image": MatchWordImage,
  "count-objects": CountObjects,
  "add-images": AddImages,
  "subtract-images": SubtractImages,
  "choose-number": ChooseNumber,
  "recognize-letters": RecognizeLetters,
  "complete-word": CompleteWord,
  "recognize-sound": RecognizeSound,
  "choose-sound": ChooseSound,
  "drag-drop": DragDrop,
  "order-objects": OrderObjects,
  "follow-sequence": FollowSequence,
  "trace-number": TraceNumber,
  "simple-puzzle": SimplePuzzle,
  "association-game": AssociationGame,
  "word-search": WordSearch,
  "crossword": Crossword,
  "coloring": ColoringGame,
  "mandala-coloring": MandalaColoring,
  "shield-puzzle": ShieldPuzzle,
  "emoji-puzzle": EmojiPuzzle,
};

interface ActivityRunnerProps {
  activity: Activity;
  categoryName?: string;
}

export function ActivityRunner({ activity, categoryName = "General" }: ActivityRunnerProps) {
  const Component = componentMap[activity.type];
  if (!Component) {
    return (
      <div className="p-8 text-center text-xl">
        Actividad &quot;{activity.type}&quot; en desarrollo
      </div>
    );
  }
  return (
    <ActivityReportProvider
      activityId={activity.id}
      activityTitle={activity.title}
      category={categoryName}
    >
      <Component activity={activity} />
    </ActivityReportProvider>
  );
}
