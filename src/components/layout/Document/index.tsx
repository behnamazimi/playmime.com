import { Montserrat, Vazirmatn } from "next/font/google";
import { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const vazirMatn = Vazirmatn({
  subsets: ["arabic"],
});

type Props = {
  children: ReactNode;
  locale: string;
};

export default function Document({ children, locale }: Props) {
  const isRtl = locale === "fa";
  const fontStyles = isRtl ? vazirMatn.className : montserrat.className;

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <Script id="google-tag-manager">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5QH4KDDB');`}
      </Script>
      <body
        className={`${fontStyles} bg-white antialiased container mx-auto px-4`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QH4KDDB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
