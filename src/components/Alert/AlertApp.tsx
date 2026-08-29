import { Alert } from "@mui/material";
import { Button } from "../Button/ButtonApp";

interface AlertAppProps {
  tipo: "warning" | "error" | "info" | "success";
  texto: string;
  sx?: any;
  action?: () => void;
  textoAction?: string;
}

export function AlertApp(props: AlertAppProps) {
  return (
    <Alert
      action={
        props.action && (
          <Button
            onClick={props.action}
            variant="outlined"
            title={props.textoAction}
          />
        )
      }
      sx={props.sx}
      severity={props.tipo}
    >
      {props.texto}
    </Alert>
  );
}
