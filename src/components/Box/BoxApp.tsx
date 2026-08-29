import { Box } from '@mui/material';
import { propsBoxApp } from './types';
import { useThemeApp } from '@/hooks/UseThemeApp';

export function BoxApp(props: propsBoxApp) {
    const { backgroundColor, cores, borderRadius } = useThemeApp();
    return (
      <Box
        {...props}
        className={props.className}
        maxWidth={props.maxWidth}
        height={props.height}
        width={props.width}
        display={props.display}
        alignItems={props.alignItems}
        justifyContent={props.justifyContent}
        gap={props.gap}
        flexDirection={props.flexDirection}
        flexWrap={props.flexWrap}
        onClick={props.onClick}
        sx={{
          visibility: props.visibility,
          resize: props.resize as any,
          backgroundColor: props.backgroundColor,
          marginTop: props.marginTop,
          animation: props.animation,
          overflowY: props.overflowy,
          transition: props.transition,
          overflowX: props.overflowx,
          '&:hover': props.hover,
          '&::after': props.after,
          '&::before': props.before,
          '&:active': props.active,
          bottom: props.bottom,
          left: props.left,
          opacity: props.opacity,
          zIndex: props.zIndex,
          right: props.right,
          marginRight: props.marginRight,
          borderTop: props.borderTop,
          top: props.top,
          cursor: props.cursor,
          transform: props.transform,
          transitionDelay: props.transition_delay,
          transitionDuration: props.transition_duration,
          textAlign: props.textAlign,
          paddingLeft: props.paddingLeft,
          paddingRight: props.paddingRight,
          borderLeft: props.borderLeft,
          margin: props.margin,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: backgroundColor.default,
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: cores.primary.main,
            borderRadius: borderRadius,
          },
          background: props.background,
        }}
        borderColor={props.borderColor}
        boxShadow={props.boxShadow}
        maxHeight={props.maxHeight}
        border={props.border}
        borderRadius={props.borderRadius}
        padding={props.padding}
        minHeight={props.minHeight}
        minWidth={props.minWidth}
        borderBottom={props.borderBottom}
        marginLeft={props.marginLeft}
        color={props.color}
        flexGrow={props.flexGrow}
        component={props.component as any}
        position={props.position as any}
        boxSizing={props.boxSizing as any}
        borderRight={props.borderRight}
        gridTemplateAreas={props.gridTemplateAreas}
        gridTemplateColumns={props.gridTemplateColumns}
        gridAutoRows={props.gridAutoRows}
        gridArea={props.gridArea}
      >
        {props.children}
      </Box>
    );
}