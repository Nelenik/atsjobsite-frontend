import { YANDEX_ID, YandexMetrikaInit } from "@/features/metrika-yandex";
import { GoogleAnalytics } from '@next/third-parties/google'

export const Analytics = () => {
  if (process.env.NODE_ENV !== 'production') return null
  return (
    <>
      <YandexMetrikaInit
        id={YANDEX_ID}
        initParameters={{ ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer", accurateTrackBounce: true, trackLinks: true }}
      />
      <GoogleAnalytics gaId="G-P6TLBK16LT" />
    </>
  );
}