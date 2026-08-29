import { CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { IconApp } from "../Icon/IconApp";
import LoadingButton from "@mui/lab/LoadingButton";
import { BoxApp } from "../Box/BoxApp";

export interface propsButton {
  title?: string;
  onClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  type?: "submit" | "button" | "reset";
  fullWidth?: boolean;
  width?: string;
  maxWidth?: string;
  autoFocus?: boolean;
  loading?: boolean;
  backGroundColor?: string;
  backGroundColorHover?: string;
  height?: string;
  disabled?: boolean;
  children?: ReactNode;
  component?: string;
  tabIndex?: number;
  endIcon?: string;
  coricon?: string;
  fontSize?: string;
}

export function Button(props: propsButton) {
  return (
    <LoadingButton
      {...props}
      size="small"
      onClick={(e) => {
        e.preventDefault();
        if (props.onClick) {
          props.onClick();
        }
      }}
      loading={props.loading}
      loadingIndicator={
        <BoxApp
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="1rem"
        >
          Carregando...
          <CircularProgress size={20} />
        </BoxApp>
      }
      tabIndex={props.tabIndex}
      autoFocus={props.autoFocus}
      disabled={props.disabled || props.loading}
      variant={props.variant}
      type={props.type}
      fullWidth={props.fullWidth}
      sx={{
        height: props.height,
        maxWidth: props.maxWidth,
        width: props.width,
        backgroundColor: props.backGroundColor,
        "&:hover": {
          backgroundColor: props.backGroundColorHover,
        },
        fontSize: props.fontSize,
      }}
      endIcon={
        props.endIcon ? (
          <IconApp color={props.coricon} icon={props.endIcon} />
        ) : undefined
      }
    >
      {props.title ?? "Continuar"}
    </LoadingButton>
  );
}
