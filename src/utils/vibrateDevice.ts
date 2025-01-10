const vibrateDevice = (pattern: number | number[] = 10) => {
  if (typeof window !== "undefined" && "vibrate" in window.navigator) {
    window.navigator.vibrate(pattern);
  }
};

export default vibrateDevice;
