import type { Metadata } from 'next';

import Sidebar from '@/components/navigation/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Header from '@/components/navigation/Header';

import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { getUser } from '@/actions/getData';
import React from 'react';

export const metadata: Metadata = {
  title: 'REkrutAI|Дашборд',
};


export default async function DashboardLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {

  const userData = await getUser()

  return (
    <React.Fragment>
      <Header userData={userData} className="sm:hidden" />

      <main className="w-full flex h-screen overflow-hidden">
        <Sidebar userData={userData} className="hidden sm:flex" />

        <div className="p-6 w-full grid auto-rows-max grid-cols-1 gap-6 h-full overflow-y-auto">
          <Suspense>
            <Breadcrumbs />
          </Suspense>

          {children}

          {modals}
        </div>
      </main>
      <Toaster />
    </React.Fragment>
  );
}
