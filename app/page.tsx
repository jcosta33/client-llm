
"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Prompt from "./components/prompt";
import { FC, useMemo } from "react";
import Output from "./components/output";
import Tweaker from "./components/tweaker";
import { Context, useInitContext } from "./context";
import { isOnPhone } from "./components/utils";

const TweakerSection: FC = () => {
  return (
    <div className="sm:col-span-2">
      <div className="h-screen overflow-auto border-r border-gray-800 p-2">
        <Tweaker />
      </div>
    </div>
  );
};

const DefaultLayout: FC = () => {
  return (
    <div className="sm:col-span-10">
      <div className="flex flex-col pl-20 pr-20 h-screen">
        <div className="flex-grow overflow-auto">
          <Output />
        </div>
        <Prompt />
      </div >
    </div >
  );
};

export default function Page() {
  const userIsOnPhone = useMemo(() => isOnPhone(), []);

  return (
    <Context.Provider value={useInitContext()}>

      <div className="grid grid-cols-12 gap-0">
        {!userIsOnPhone && <TweakerSection />}
        <DefaultLayout />
      </div>
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
    </Context.Provider >
  );
}
