import { ReactNode } from "react";

export type justifyContent =
  | 'start'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'end';

export type alignItems = 'stretch' | 'center' | 'start' | 'end';
export type flexDirection =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse';

export type overflowY = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
export type flexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type textAlign =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';

export type visibility = 'visible' | 'hidden' | 'collapse';

export interface propsBoxApp {
  visibility?: visibility;
  margin?: string;
  onMouseDown?: (e: any) => any;
  onMouseUp?: (e: any) => any;
  resize?:
    | 'none '
    | 'both'
    | 'horizontal'
    | 'vertical'
    | 'block'
    | 'inline';
  className?: string;
  width?: string;
  borderLeft?: string;
  height?: string;
  alignItems?: alignItems;
  justifyContent?: justifyContent;
  children: ReactNode;
  flexDirection?: flexDirection;
  borderRadius?: string;
  boxShadow?: string;
  gap?: string;
  display?: string;
  backgroundColor?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  border?: string;
  padding?: string;
  animation?: string;
  ref?: any;
  marginTop?: string;
  borderBottom?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  overflowy?: overflowY;
  overflowx?: overflowY;
  color?: string;
  transition?: string;
  id?: string;
  flexGrow?: number;
  component?: string;
  position?: string;
  boxSizing?: string;
  borderRight?: string;
  gridTemplateAreas?: string;
  gridTemplateColumns?: string;
  gridAutoRows?: string;
  gridArea?: string;
  hover?: any;
  after?: any;
  bottom?: string;
  left?: string;
  opacity?: string;
  zIndex?: string;
  right?: string;
  borderTop?: string;
  top?: string;
  cursor?: string;
  transform?: string;
  transition_delay?: string;
  transition_duration?: string;
  textAlign?: textAlign;
  borderColor?: string;
  paddingRight?: string;
  paddingLeft?: string;
  sx?: any;
  flexWrap?: flexWrap;
  onClick?: (e: any) => void;
  background?: string;
  active?: any;
  before?: any;
}