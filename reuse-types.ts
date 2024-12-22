export enum Mode {
  ADD = 'ADD',
  EDIT = 'edit',
  CLONE = 'clone',
}
type OrderModeObject = {
  [key in keyof typeof Mode]: string; 
};

export type ModeStrings = `${Mode}`;