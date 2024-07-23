import { atom } from 'jotai';

export const airCallActiveStepAtom = atom('Archive');
export const currentAirCallHeaderStateAtom = atom('InBox');
export const currentAirCallFooterStateAtom = atom('Setting');
export const colorAtom = atom('blue');

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

export const currentColorHandlerAtom = atom(null, (get, set, newState) => {
  set(colorAtom, newState);
});
