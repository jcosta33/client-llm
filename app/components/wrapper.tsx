"use client";
import { FC, useMemo } from "react";
import { Grid } from "@mui/material";
import Output from "./output";
import Prompt from "./prompt";
import Tweaker from "./tweaker";
import { isOnPhone } from "./utils";
import { Context, useInitContext } from "../context";
import { ModeToggle } from "@/components/ui/mode-toggle";

const TweakerSection: FC = () => {
  return (
    <div className="sm:col-span-2">
      <div className="h-screen overflow-auto border-r border-gray-800 p-2">
        <ModeToggle />

        <Tweaker />
      </div>
    </div>
  );
};


const DefaultLayout: FC = () => {
  return (
    <div className="sm:col-span-10">
      <div className="grid grid-cols-2">
        <div className="sm:col-span-1">
          <div className='p-4 h-full overflow-auto'>
            <Prompt />
          </div>
        </div>
        <div className="sm:col-span-1">
          <div className='p-4 h-full overflow-auto'>
            <Output />
          </div>
        </div>
      </div>
    </div >
  );
};

const Wrapper: FC = () => {
  const userIsOnPhone = useMemo(() => isOnPhone(), []);
  return (
    <Context.Provider value={useInitContext()}>
      <div className="grid grid-cols-12 gap-0">
        {!userIsOnPhone && <TweakerSection />}
        <DefaultLayout />
      </div>

    </Context.Provider >
  );
};

export default Wrapper;
