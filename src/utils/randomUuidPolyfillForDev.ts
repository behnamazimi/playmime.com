if (typeof window !== "undefined") {
  // @ts-expect-error - This is needed for local development
  window.crypto.randomUUID = () => {
    const array = new Uint32Array(2);
    window.crypto.getRandomValues(array);
    return array.join("-");
  };
}

export {};
