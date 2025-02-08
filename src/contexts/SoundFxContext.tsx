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
  playSuccess: () => void;
  stopSuccess: () => void;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  isMuteToggleDisplayed: boolean;
  setIsMuteToggleDisplayed: (isMuteToggleDisplayed: boolean) => void;
};

const SoundFxContext = createContext<SoundFxContextType | undefined>(undefined);

export const SoundFxProvider = ({ children }: { children: ReactNode }) => {
  const beepAudioRef = useRef<Howl | null>(null);
  const successAudioRef = useRef<Howl | null>(null);

  const [isMuted, setIsMuted] = useLocalStorage("mute-fx", false);
  const [isMuteToggleDisplayed, setIsMuteToggleDisplayed] = useState(false);

  useEffect(() => {
    const initBeefAudio = async ({
      initBeep,
      initSuccess,
    }: {
      initBeep: boolean;
      initSuccess: boolean;
    }) => {
      await import("howler").then(({ Howl }) => {
        if (initBeep) {
          beepAudioRef.current = new Howl({
            src: ["/sounds/clock-ticking.mp3"],
            autoplay: false,
            loop: true,
            volume: 1.0,
            rate: 0.85,
            mute: isMuted,
          });
        }
        if (initSuccess) {
          successAudioRef.current = new Howl({
            src: ["/sounds/success.mp3"],
            autoplay: false,
            loop: false,
            volume: 0.7,
            rate: 0.85,
            mute: isMuted,
          });
        }
      });
    };

    if (!beepAudioRef.current || !successAudioRef.current) {
      initBeefAudio({
        initBeep: !beepAudioRef.current,
        initSuccess: !successAudioRef.current,
      });
    }

    if (beepAudioRef.current) {
      beepAudioRef.current.mute(isMuted);
    }
    if (successAudioRef.current) {
      successAudioRef.current.mute(isMuted);
    }
  }, [isMuted]);

  useEffect(() => {
    return () => {
      if (beepAudioRef.current) {
        beepAudioRef.current.unload();
        beepAudioRef.current = null;
      }

      if (successAudioRef.current) {
        successAudioRef.current.unload();
        successAudioRef.current = null;
      }
    };
  }, []);

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

  const playSuccess = useCallback(() => {
    if (!isMuted && successAudioRef.current) {
      successAudioRef.current.play();
    }
  }, [isMuted]);

  const stopSuccess = useCallback(() => {
    if (successAudioRef.current) {
      successAudioRef.current.stop();
    }
  }, []);

  const value = useMemo(
    () => ({
      playClockTicking,
      stopClockTicking,
      playSuccess,
      stopSuccess,
      isMuted,
      setIsMuted,
      isMuteToggleDisplayed,
      setIsMuteToggleDisplayed,
    }),
    [
      playClockTicking,
      stopClockTicking,
      playSuccess,
      stopSuccess,
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
