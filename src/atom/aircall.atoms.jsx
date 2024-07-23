import { atom } from 'jotai';

export const airCallActiveStepAtom = atom('Archive');
export const currentAirCallHeaderStateAtom = atom('InBox');
export const currentAirCallFooterStateAtom = atom('Call');

export const airCallActiveHandleAtom = atom(null, (get, set) => {
  let activeStep = get(airCallActiveStepAtom);
  if (activeStep === 'Activity') {
    set(airCallActiveStepAtom, 'Archive');
  } else {
    set(airCallActiveStepAtom, 'Activity');
  }
});

export const currentAirCallHeaderStateHandleAtom = atom(null, (get, set) => {
  let activeStep = get(currentAirCallHeaderStateAtom);
  if (activeStep === 'InBox') {
    set(currentAirCallHeaderStateAtom, 'AllCalls');
  } else {
    set(currentAirCallHeaderStateAtom, 'InBox');
  }
});

export const currentAirCallFooterStateHandleAtom = atom(null, (get, set) => {
  let activeStep = get(currentAirCallFooterStateAtom);
  if (activeStep === 'InBox') {
    set(currentAirCallFooterStateAtom, 'AllCalls');
  } else {
    set(currentAirCallFooterStateAtom, 'InBox');
  }
});
