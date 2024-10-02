import "@/styles/globals.css";
import type { AppProps } from "next/app";

//testing

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className="relative h-screen w-screen"
      style={{ backgroundImage: 'url("/weather-bg.jpg")' }}
    >
      <div className="flex md:flex-row flex-col justify-center items-center w-full h-full bg-black bg-opacity-35 p-8">
        <Component {...pageProps} />;
      </div>
    </div>
  );
}
