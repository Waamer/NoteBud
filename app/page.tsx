import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FlipWords } from "@/components/ui/flip-words";
import { SignInButton } from "@clerk/nextjs";
import Bot from "@/components/bot"
import { FilePenLine, Handshake, LogIn, MessagesSquare, PartyPopper, Search, Server } from "lucide-react";
import { Footer } from "./footer";

export default function LandingPage() {

  const words = ['Documents', 'Notes', 'Team', 'Organization']

  return (<>
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-4 pb-4 pt-24 sm:pt-28">
      <div className="flex flex-col lg:flex-row-reverse border-2 rounded-lg">
          <div className="flex-1 flex justify-center lg:justify-end items-center h-64 lg:h-auto lg:w-fit bg-rose-200 dark:bg-rose-950/50">
            <Bot />
          </div>
          <Card className="border-0 text-left p-4 sm:p-6 bg-rose-200/60 dark:bg-rose-950/30 ">
            <div className="text-3xl font-medium tracking-tight text-gray-900 dark:text-rose-50 md:text-7xl text-left">
              Take control of <br />
              your<FlipWords words={words}/>
            </div>
            <p className="mt-2 md:mt-3 text-md md:text-lg text-gray-600 dark:text-gray-400">
              NoteBud is able to store your/team`s docs and notes, allows being able to talk with your docs, edit notes, and provides easy vector search
            </p>
            <div className="mt-4 flex items-center justify-center md:justify-start gap-x-6">
              <SignInButton>
                <Button className="flex gap-2 hover:gap-3 transition-all duration-200">
                  Sign in/up
                  <LogIn />
                </Button>
              </SignInButton>
            </div>
          </Card>
      </div>
      <div className="mx-auto w-full max-w-7xl py-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-6">
        <Card className="grid gap-6 p-8 md:p-10 bg-rose-200/60 dark:bg-rose-950/30 hover:shadow-2xl transition-all duration-250 dark:shadow-[#0e0202]">
          <Server size={50} className="text-rose-950 dark:text-rose-100 -mb-3"/>
          <h3 className="text-xl sm:text-2xl font-medium text-rose-950 dark:text-rose-100">Doc/Note Storage</h3>
          <p className="text-md text-gray-900 dark:text-white">
            Upload your text documents or create notes to easily access on sign in (Using Convex)
          </p>
        </Card>
        <Card className="grid gap-6 p-8 md:p-10 bg-rose-200/60 dark:bg-rose-950/30 hover:shadow-2xl transition-all duration-250 dark:shadow-[#0e0202]">
          <FilePenLine size={50} className="text-rose-950 dark:text-rose-100 -mb-3"/>
          <h3 className="text-xl sm:text-2xl font-medium text-rose-950 dark:text-rose-100">Note Editor</h3>
          <p className="text-md text-gray-900 dark:text-white">
            Edit, save, and design any notes made with our simple text editor (Using TipTap)
          </p>
        </Card>
        <Card className="grid gap-6 p-8 md:p-10 bg-rose-200/60 dark:bg-rose-950/30 hover:shadow-2xl transition-all duration-250 dark:shadow-[#0e0202]">
          <MessagesSquare size={50} className="text-rose-950 dark:text-rose-100 -mb-3"/>
          <h3 className="text-xl sm:text-2xl font-medium text-rose-950 dark:text-rose-100">AI Document Chat</h3>
          <p className="text-md text-gray-900 dark:text-white">
            Chat with any uploaded Documents with a AI who can answer your questions (Using OpenAI)
          </p>
        </Card>
        <Card className="grid gap-6 p-8 md:p-10 bg-rose-200/60 dark:bg-rose-950/30 hover:shadow-2xl transition-all duration-250 dark:shadow-[#0e0202]">
          <Search size={50} className="text-rose-950 dark:text-rose-100 -mb-3"/>
          <h3 className="text-xl sm:text-2xl font-medium text-rose-950 dark:text-rose-100">AI Vector Search</h3>
          <p className="text-md text-gray-900 dark:text-white">
            Search through your own/organization`s Docs/Notes using AI Vector Search (Using Convex Vector Search)
          </p>
        </Card>
        <Card className="grid gap-6 p-8 md:p-10 bg-rose-200/60 dark:bg-rose-950/30 hover:shadow-2xl transition-all duration-250 dark:shadow-[#0e0202]">
          <Handshake size={50} className="text-rose-950 dark:text-rose-100 -mb-3"/>
          <h3 className="text-xl sm:text-2xl font-medium text-rose-950 dark:text-rose-100">Team Organizations</h3>
          <p className="text-md text-gray-900 dark:text-white">
            Make organizations to share Doc/Note access and editability (Using Clerk Organizations)
          </p>
        </Card>
        <Card className="grid gap-6 p-8 md:p-10 bg-rose-200/60 dark:bg-rose-950/30 hover:shadow-2xl transition-all duration-250 dark:shadow-[#0e0202]">
          <PartyPopper size={50} className="text-rose-950 dark:text-rose-100 -mb-3"/>
          <h3 className="text-xl sm:text-2xl font-medium text-rose-950 dark:text-rose-100">All For Free!</h3>
          <p className="text-md text-gray-900 dark:text-white">
            All of these features and not a single dime taken from you pockets!
          </p>
        </Card>
      </div>
    </div>
    </div>
    <Footer /></>
  );
}
