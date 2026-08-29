import { IconButton, Slide, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, ReactNode } from "react";
import { IconApp } from "../Icon/IconApp";
import { listaDeIcones } from "@/config/ListaDeIcones";
import { useAppParceiroContext } from "@/context/AppParceiroContext";
import { TransitionProps } from "@mui/material/transitions";

interface propsModalApp {
  open: boolean;
  close: () => void;
  children: ReactNode;
  fullWidth?: boolean;
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";
}

export const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalApp(props: propsModalApp) {
  const { parceiro } = useAppParceiroContext();
  return (
    <BootstrapDialog
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      open={props.open}
      onClose={props.close}
      slots={{
        transition: Transition
      }}
    >
      <DialogTitle>{parceiro?.nomeFantasia ?? ""}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.close}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <IconApp icon={listaDeIcones.close} />
      </IconButton>
      <DialogContent>{props.children}</DialogContent>
    </BootstrapDialog>
  );
}
