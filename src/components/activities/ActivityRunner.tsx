"use client";

import { Activity } from "@/types";
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
import { SimplePuzzle } from "./SimplePuzzle";
import { AssociationGame } from "./AssociationGame";

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
  "simple-puzzle": SimplePuzzle,
  "association-game": AssociationGame,
};

interface ActivityRunnerProps {
  activity: Activity;
}

export function ActivityRunner({ activity }: ActivityRunnerProps) {
  const Component = componentMap[activity.type];
  if (!Component) {
    return (
      <div className="p-8 text-center text-xl">
        Actividad &quot;{activity.type}&quot; en desarrollo
      </div>
    );
  }
  return <Component activity={activity} />;
}
