'use client'

import { Button } from '@/shared/ui/shadcn/button';
import { usePathname } from 'next/navigation'

export default function Error(
  {
    error,
  }: {
    error: Error & { digest?: string }
  }
) {
  const pathname = usePathname();
  console.log(error)
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button
        onClick={() => window.location.href = pathname || '/'}
      >
        Back
      </Button>
    </div>
  )
}