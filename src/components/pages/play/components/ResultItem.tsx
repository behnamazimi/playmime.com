import { useTranslations } from "next-intl";

type ResultItemProps = {
  name: string;
  rank: number;
  score: number;
  finalScore?: string;
  correct?: number;
  timeRemaining?: number;
  quickPlayResult?: boolean;
};

const ResultItem = ({
  name,
  rank,
  score,
  finalScore,
  correct,
  timeRemaining,
  quickPlayResult,
}: ResultItemProps) => {
  const t = useTranslations("play");
  const firstThreeStyles: Record<number, string[]> = {
    0: ["from-yellow-400 to-yellow-200", "text-yellow-600"],
    1: ["from-gray-300 to-gray-200", "text-gray-400"],
    2: ["from-orange-400 to-orange-200", "text-orange-600"],
  };

  const styles = firstThreeStyles[rank] || ["", "text-gray-300"];

  return (
    <div
      className={`rounded-sm bg-gray-50 flex items-center justify-start p-4 ltr:bg-linear-to-r rtl:bg-linear-to-l ${styles[0]}`}
    >
      <span className={`mx-4 font-bold text-3xl ${styles[1]}`}>
        #{rank + 1}
      </span>
      <div className="flex flex-col justify-center items-start ml-2 flex-1">
        <div className="flex justify-between flex-1 w-full">
          <strong>{name}</strong>
          <span className="ml-4 font-semibold">
            {t("shared.teamScore", {
              score: (quickPlayResult ? score : finalScore) || "",
            })}
          </span>
        </div>
        {!quickPlayResult && (
          <div className="flex justify-between text-sm opacity-50 w-full flex-1">
            <span>
              {t("shared.correctLabel", {
                score: (quickPlayResult ? finalScore : correct) || "",
              })}
            </span>
            <span className="ml-4">
              {t("shared.timeRemaining", { time: timeRemaining || "" })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultItem;
