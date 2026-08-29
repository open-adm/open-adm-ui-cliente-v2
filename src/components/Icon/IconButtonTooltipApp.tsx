import { IconButton, Tooltip, Zoom } from "@mui/material";
import { IconApp } from "./IconApp";
import { Link } from 'react-router-dom'

interface propsIconButtonTooltipApp {
  titulo: string;
  cor?: string;
  href?: string;
  target?: string;
  icon: string;
  onClick?: () => void;
}

export function IconButtonTooltipApp(props: propsIconButtonTooltipApp) {
  return (
    <Tooltip
      slots={{
        transition: Zoom,
      }}
      title={props.titulo}
      placement="top"
    >
      <IconButton
        to={props.href ?? ''}
        component={props.href ? Link : (undefined as any)}
        sx={{ color: props.cor }}
        target={props.target}
        onClick={props.onClick}
      >
        <IconApp icon={props.icon} />
      </IconButton>
    </Tooltip>
  );
}
