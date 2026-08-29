import { useThemeApp } from '@/hooks/UseThemeApp';
import { Typography } from '@mui/material';

interface propsText {
  titulo: string;
  height?: string;
  marginTop?: string;
  fontSize?: string;
  fontWeight?: number;
  color?: string;
  width?: string;
  textAlign?: string;
  marginBotton?: string;
  marginLeft?: string;
  borderBottom?: string;
  padding?: string;
  overflow?: string;
  textOverflow?: string;
  hover?: any;
  verticalAlign?: string;
  maxWidth?: string;
  whiteSpace?: string;
  textDecoration?: string;
  cursor?: string;
  onClick?: () => void;
}

export function TextApp(props: propsText) {
  const { cores } = useThemeApp();
  return (
    <Typography
    variant='body2'
    fontSize={props.fontSize}
      height={props.height}
      marginTop={props.marginTop}
      fontWeight={props.fontWeight}
      color={props.color ?? cores.text.primary}
      width={props.width}
      textAlign={props.textAlign as any}
      marginBottom={props.marginBotton}
      marginLeft={props.marginLeft}
      borderBottom={props.borderBottom}
      padding={props.padding}
      overflow={props.overflow}
      textOverflow={props.textOverflow}
      onClick={props.onClick}
      sx={{
        cursor: props.cursor,
        ':hover': props.hover,
        verticalAlign: props.verticalAlign,
        whiteSpace: props.whiteSpace,
        textDecoration: props.textDecoration,
      }}
      maxWidth={props.maxWidth}
    >
      {props.titulo}
    </Typography>
  );
}
