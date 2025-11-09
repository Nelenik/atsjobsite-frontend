import StartupSvg from '@/assets/startup.svg?rc';
import { cn } from '../lib/utils';

export const NothingYet = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn('flex flex-col items-center justify center gap-20', className)}
    >
      <StartupSvg
        className='w-[50%]'
      />
      <div>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          Здесь пока ничего нет
        </h2>
        <p className='text-muted-foreground text-center'>
          Но мы скоро что-то придумаем!
        </p>
      </div>
    </div>
  );
}