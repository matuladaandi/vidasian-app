import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // font lato
    <div className={lato.className}>
      <Component {...pageProps} />
    </div>
  );
}

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
