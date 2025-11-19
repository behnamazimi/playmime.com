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
  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 0:
        return {
          border: "border-primary",
          text: "text-primary",
          bg: "bg-primary/10",
        };
      case 1:
        return {
          border: "border-neon-magenta",
          text: "text-neon-magenta",
          bg: "bg-neon-magenta/10",
        };
      case 2:
        return {
          border: "border-neon-blue",
          text: "text-neon-blue",
          bg: "bg-neon-blue/10",
        };
      default:
        return {
          border: "border-primary/30",
          text: "text-muted-foreground",
          bg: "bg-card",
        };
    }
  };

  const styles = getRankStyles(rank);

  return (
    <div
      className={`rounded-lg glass-dark border flex items-center justify-start p-4 ${styles.border} ${styles.bg}`}
    >
      <span className={`mx-4 font-bold text-3xl ${styles.text}`}>
        #{rank + 1}
      </span>
      <div className="flex flex-col justify-center items-start ml-2 flex-1">
        <div className="flex justify-between flex-1 w-full">
          <strong className="text-foreground">{name}</strong>
          <span className="ml-4 font-semibold text-foreground">
            {t("shared.teamScore", {
              score: (quickPlayResult ? score : finalScore) || "",
            })}
          </span>
        </div>
        {!quickPlayResult && (
          <div className="flex justify-between text-sm text-muted-foreground w-full flex-1">
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
