import { GoogleAnalytics } from '@next/third-parties/google'

export const Analytics = () => {
  if (process.env.NODE_ENV !== 'production') return null
  return (
    <>
      <GoogleAnalytics gaId="#" />
    </>
  );
}