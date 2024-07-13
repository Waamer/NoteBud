import { Bot, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
  

export function Footer() {
  return (
    <footer className="w-full bg-rose-200/60 dark:bg-rose-950/30 p-4 px-6 sm:px-8">
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-3 text-center sm:justify-between">
        <Bot size={50} />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 px-2">
          <li>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger>
                        <Link href='https://github.com/Waamer'>
                            <p className="transition-all hover:text-rose-700 dark:hover:text-rose-600/70 duration-200 hover:scale-110">
                                <Github />
                            </p>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className="mb-1.5">
                        <p>My Github</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger>
                        <Link href='https://www.linkedin.com/in/waleed-aamer-866722245/'>
                            <p className="transition-all hover:text-rose-700 dark:hover:text-rose-600/70 duration-200 hover:scale-110">
                                <Linkedin />
                            </p>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className="mb-1.5">
                        <p>My LinkedIn</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </li>
          <li>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger>
                        <Link href='mailto:waamer1a@gmail.com'>
                            <p className="transition-all hover:text-rose-700 dark:hover:text-rose-600/70 duration-200 hover:scale-110">
                                <Mail />
                            </p>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent className="mb-1.5">
                        <p>My Email</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </div>
      <hr className="mt-2 mb-4" />
      <p className="text-center font-medium">
        &copy; 2024 Waleed Aamer
      </p>
    </footer>
  );
}