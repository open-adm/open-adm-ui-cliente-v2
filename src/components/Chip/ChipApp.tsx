import { Chip } from "@mui/material";
import { IconApp } from "../Icon/IconApp";

interface propsChipApp {
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  label?: string;
  width?: string;
  icone?: string;
}

export function ChipApp(props: propsChipApp) {
  return (
    <Chip
      size="small"
      sx={{ width: props.width }}
      color={props.color ?? "primary"}
      label={props.label}
      icon={<IconApp icon={props.icone as any} />}
    />
  );
}
