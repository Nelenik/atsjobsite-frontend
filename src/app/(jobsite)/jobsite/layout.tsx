import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "../../rekru-globals.css";

import { Toaster } from "@/shared/ui/shadcn/toaster";
import { NavigationConfigProvider, RekruHeader } from "@/widgets/rekru-nav";
import QueryProvider from "@/shared/providers/QueryProvider";
import { getTenant } from "@/app/_actions/getTenant";
import { JobsiteFooter } from "@/widgets/rekru-footer";

import { TenantProvider } from "@/shared/providers/TenantProvider";

import { Analytics } from "@/widgets/analytics";

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Rekru.ru - доска вакансий",
  description: "Новый подход к поиску вакансий. Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора вакансий. Теперь вы можете найти работу мечты в короткие сроки.",
};

export default async function JobSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const tenant = await getTenant()

  return (
    <html lang="ru" className={`${inter.variable}`}>
      <body
        className={`font-inter text-sm antialiased [scrollbar-gutter:stable] bg-background text-foreground`}
      >
        <Analytics />
        <TenantProvider tenant={tenant}>
          <QueryProvider>
            {/* Header */}
            <NavigationConfigProvider>
              <RekruHeader
              />
            </NavigationConfigProvider>
            {/* Main content */}
            <main className='@container py-10'>
              <div className="rekru-container">
                {children}
              </div>
            </main>
            {/* Footer */}
            <JobsiteFooter />
          </QueryProvider>
        </TenantProvider>
        <Toaster />

      </body>
    </html>
  );
}
