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
        className={`relative flex justify-center items-center p-2 py-12 w-full h-40 rounded-lg border transition-all duration-300 ${
          isRunning
            ? "glass-dark-strong border-primary/50 bg-primary/5"
            : "glass-dark border-primary/20"
        }`}
      >
        {isRunning ? (
          <>
            <span className="absolute w-full p-2 flex items-center justify-center text-3xl md:text-4xl font-bold text-primary">
              {currentWord?.word}
            </span>
            <span className="word-category absolute bottom-4 right-4 font-normal text-sm text-muted-foreground">
              {currentWord?.category}
            </span>
          </>
        ) : (
          <span className="flex flex-col gap-4 items-center">
            <span className="text-xl font-semibold text-foreground">
              {t("shared.hiddenWordTitleForTeam", { team: currentTeam.teamId })}
            </span>
            <EyeSlashIcon className="h-10 w-10 text-muted-foreground" />
          </span>
        )}
      </div>

      <RemainingTime time={currentTeam.timeRemaining} />
    </>
  );
};

export default GameStatus;
