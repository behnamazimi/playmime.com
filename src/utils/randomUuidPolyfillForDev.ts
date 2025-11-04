if (typeof window !== "undefined" && !window.crypto.randomUUID) {
  // Polyfill for environments that don't support crypto.randomUUID
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window.crypto as any).randomUUID = (): string => {
    const array = new Uint32Array(2);
    window.crypto.getRandomValues(array);
    return array.join("-");
  };
}

export {};
