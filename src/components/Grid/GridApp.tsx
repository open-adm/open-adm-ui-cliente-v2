import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface propsGridApp {
  children: ReactNode;
  width?: string;
  container?: boolean;
  spacing?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  padding?: string;
}

export function GridApp(props: propsGridApp) {
  return (
    <Grid
      width="100%"
      spacing={props.spacing}
      container={props.container}
      size={{ xs: props.xs, sm: props.sm, md: props.md, lg: props.lg }}
      padding={props.padding}
    >
      {props.children}
    </Grid>
  );
}
