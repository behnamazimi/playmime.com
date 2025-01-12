import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

type GameStatusProps = {
  isRunning: boolean;
  currentWord: string | null;
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
          <span className="absolute w-full p-2 flex items-center justify-center text-3xl font-semibold">
            {currentWord}
          </span>
        ) : (
          <span className="flex flex-col gap-4">
            <span className="text-xl font-semibold">
              {t("shared.hiddenWordTitle", { team: currentTeam.teamId })}
            </span>
            <EyeSlashIcon className="h-10 w-10 text-gray-500" />
          </span>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-2 my-8">
        <h3 className="text-xl font-light">{t("shared.timeRemainingLabel")}</h3>
        <span className="text-2xl font-bold">
          {t("shared.timeRemainingValue", {
            time: currentTeam.timeRemaining,
          })}
        </span>
      </div>
    </>
  );
};

export default GameStatus;
