'use client'

import Link from "next/link";
import LogoSvg from '@/assets/icons/logo.svg?rc';
import { Menu } from 'lucide-react'
import SideBarBtn from "@/components/Buttons/SideBarBtn";
import HomeIcon from '@/assets/icons/home.svg?rc'
import VacansyIcon from '@/assets/icons/user-money.svg?rc'
import ReportIcon from '@/assets/icons/file.svg?rc'
import SettingIcon from '@/assets/icons/time-settings.svg?rc'
import { cn } from "@/lib/utils";
import useSidebarControl from "@/hooks/sidebar-hook";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


const Sidebar = () => {
  const { sidebarRef, handleOpen, isSidebarOpen, showText } = useSidebarControl()

  //temporar
  const userName = 'Петров Дмитрий'
  const userEmail = 'test@gmail.com'

  return (
    <div ref={sidebarRef} className="flex flex-col items-start px-4 py-6  bg-sidebar text-sidebar-foreground ">
      <Link href={'/'} className="mb-3">
        <LogoSvg width={50} height={50} />
      </Link>
      <SideBarBtn onClick={handleOpen} size={'icon'} className={`${isSidebarOpen && "rotate-90"} transition-transform duration-300 mb-8 justify-center self-end`}>
        <Menu stroke="white" />
      </SideBarBtn>
      <nav className={cn(
        "mt-6 transition-all ease-in-out duration-300 mb-auto",
        isSidebarOpen ? "w-44" : "w-12"
      )}>
        <ul className="space-y-0">
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1'}>
                <HomeIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Главная</span>}
              </Link>
            </SideBarBtn>
          </li>
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1/vacancies'}>
                <VacansyIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Вакансии</span>}
              </Link>
            </SideBarBtn>
          </li>
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1/reports'}>
                <ReportIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Отчеты</span>}
              </Link>
            </SideBarBtn>
          </li>
          <li>
            <SideBarBtn asChild>
              <Link className="w-full gap-0" href={'/companies/1/settings'}>
                <SettingIcon className="[&>*]:fill-sidebar-foreground" /> {showText && <span className="ml-2">Настройки</span>}
              </Link>
            </SideBarBtn>
          </li>
        </ul>
      </nav>
      <div className="inline-flex gap-2 items-start">

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        {showText && <div >
          <p className="scroll-m-20 text-sm font-semibold tracking-tight mb-0.5 max-w-44">
            {userName}
          </p>
          <a href={`mailto:${userEmail}`} className="text-sm text-muted-foreground">{userEmail}</a>
        </div>}
      </div>
    </div>
  );
}

export default Sidebar;