import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { IconApp } from "./IconApp";
import { Link } from 'react-router-dom'

interface propsIconButton {
  icon: string;
  onClick?: () => void;
  sx?: any;
  width?: string;
  cor?: string;
  href?: string;
}

export function IconButtonApp(props: propsIconButton) {
  return (
    <InputAdornment position="end" sx={props.sx}>
      <IconButton
        onClick={props.onClick}
        to={props.href ?? ''}
        component={props.href ? Link : (undefined as any)}
      >
        <IconApp icon={props.icon} width={props.width} color={props.cor} />
      </IconButton>
    </InputAdornment>
  );
}
