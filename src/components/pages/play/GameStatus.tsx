import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Word } from "@/types";
import RemainingTime from "@/components/pages/play/components/RemainingTime";

type GameStatusProps = {
  isRunning: boolean;
  currentWord: Word | null;
  currentTeam: { teamId: number; timeRemaining: number };
};

const GameStatus = ({
  isRunning,
  currentWord,
  currentTeam,
}: GameStatusProps) => {
  const t = useTranslations("play");

  return (
    <>
      <div
        className={`relative flex justify-center items-center p-2 py-12 w-full text-gray-500 h-40 rounded-sm ${
          isRunning ? "bg-blue-50" : "bg-gray-50"
        }`}
      >
        {isRunning ? (
          <>
            <span className="absolute w-full p-2 flex items-center justify-center text-3xl font-semibold">
              {currentWord?.word}
            </span>
            <span className="word-category absolute bottom-4 right-4 font-normal text-sm">
              {currentWord?.category}
            </span>
          </>
        ) : (
          <span className="flex flex-col gap-4">
            <span className="text-xl font-semibold">
              {t("shared.hiddenWordTitleForTeam", { team: currentTeam.teamId })}
            </span>
            <EyeSlashIcon className="h-10 w-10 text-gray-500" />
          </span>
        )}
      </div>

      <RemainingTime time={currentTeam.timeRemaining} />
    </>
  );
};

export default GameStatus;
