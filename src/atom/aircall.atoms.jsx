import { atom } from 'jotai';

export const airCallActiveStepAtom = atom('Activity');
export const currentAirCallHeaderStateAtom = atom('InBox');
export const currentAirCallFooterStateAtom = atom('Call');
export const colorAtom = atom('blue');
export const currentTotalCallStateAtom = atom();
export const airCallActiveHandleAtom = atom(null, (get, set, newState) => {
  set(airCallActiveStepAtom, newState);
});

export const currentAirCallHeaderStateHandleAtom = atom(
  null,
  (get, set, newState) => {
    set(currentAirCallHeaderStateAtom, newState);
  }
);

export const currentColorHandlerAtom = atom(null, (get, set, newState) => {
  set(colorAtom, newState);
});

export const currentPageHandlerAtom = atom(null, (get, set, newState) => {
  set(currentAirCallFooterStateAtom, newState);
});

export const currentTotalCallHandlerAtom = atom(null, (get, set, newState) => {
  set(currentTotalCallStateAtom, newState);
});
