import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Howl } from "howler";
import useLocalStorage from "@/hooks/useLocalStorage";

type SoundFxContextType = {
  playClockTicking: () => void;
  stopClockTicking: () => void;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  isMuteToggleDisplayed: boolean;
  setIsMuteToggleDisplayed: (isMuteToggleDisplayed: boolean) => void;
};

const SoundFxContext = createContext<SoundFxContextType | undefined>(undefined);

export const SoundFxProvider = ({ children }: { children: ReactNode }) => {
  const beepAudioRef = useRef<Howl | null>(null);

  const [isMuted, setIsMuted] = useLocalStorage("mute-fx", false);
  const [isMuteToggleDisplayed, setIsMuteToggleDisplayed] = useState(false);

  useEffect(() => {
    const initBeefAudio = async () => {
      await import("howler").then(({ Howl }) => {
        beepAudioRef.current = new Howl({
          src: ["/sounds/clock-ticking.mp3"],
          autoplay: false,
          loop: true,
          volume: 1.0,
          rate: 0.85,
          mute: false,
        });
      });
    };

    if (!beepAudioRef.current) {
      initBeefAudio();
    } else {
      beepAudioRef.current.mute(isMuted);
    }

    return () => {
      if (beepAudioRef.current) {
        beepAudioRef.current?.unload();
        beepAudioRef.current = null;
      }
    };
  }, [isMuted]);

  const playClockTicking = useCallback(() => {
    if (!isMuted && beepAudioRef.current && !beepAudioRef.current.playing()) {
      beepAudioRef.current.play();
    }
  }, [isMuted]);

  const stopClockTicking = useCallback(() => {
    if (beepAudioRef.current) {
      beepAudioRef.current.stop();
    }
  }, []);

  const value = useMemo(
    () => ({
      playClockTicking,
      stopClockTicking,
      isMuted,
      setIsMuted,
      isMuteToggleDisplayed,
      setIsMuteToggleDisplayed,
    }),
    [
      playClockTicking,
      stopClockTicking,
      isMuted,
      setIsMuted,
      isMuteToggleDisplayed,
      setIsMuteToggleDisplayed,
    ]
  );
  return <SoundFxContext value={value}>{children}</SoundFxContext>;
};

export const useSoundFx = (): SoundFxContextType => {
  const context = useContext(SoundFxContext);
  if (!context) {
    throw new Error("useSoundFx must be used within a SoundFxProvider");
  }
  return context;
};

export const useDisplayMuteToggle = () => {
  const { setIsMuteToggleDisplayed } = useSoundFx();
  useEffect(() => {
    setIsMuteToggleDisplayed(true);

    return () => {
      setIsMuteToggleDisplayed(false);
    };
  }, [setIsMuteToggleDisplayed]);
};
