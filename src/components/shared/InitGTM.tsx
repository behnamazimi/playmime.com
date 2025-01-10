"use client";
import Script from "next/script";
import { FC } from "react";

const InitGTM: FC = () => {
  return (
    <Script
      id="google-tag-manager"
      src="https://www.googletagmanager.com/gtag/js?id=G-WJKPXPCFY4"
      onReady={() => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
          window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", "G-WJKPXPCFY4");
      }}
    />
  );
};

export default InitGTM;
