import React from 'react'
import { atom } from "jotai";

export const airCallActiveStepAtom = atom("Activity");

export const airCallActiveHandleAtom = atom(null, (get, set) => {
  let activeStep = get(airCallActiveStepAtom);
  if(activeStep ==='Activity'){
    set(airCallActiveStepAtom, "Archive");
  }else{
    set(airCallActiveStepAtom, "Activity");
  }
  
});
