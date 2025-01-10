const notABrowserEnv = typeof window === "undefined";
const navigatorNotPresent = typeof navigator === "undefined";

const checkOnlineStatus = () => {
  if (notABrowserEnv || navigatorNotPresent) {
    return false;
  }
  return window.navigator.onLine;
};

export default checkOnlineStatus;
