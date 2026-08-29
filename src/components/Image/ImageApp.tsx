interface propsImageApp {
  src: string;
  alt: string;
  className?: string;
  width: number | string;
  height: number | string;
  maxWidth?: string;
  maxHeigth?: string;
  borderRadius?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  objectPosition?: string;
}

export function ImageApp(props: propsImageApp) {
  return (
    <img
      alt={props.alt}
      src={props.src}
      width={props.width}
      height={props.height}
      style={{
        width: props.width,
        height: props.height,
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeigth,
        borderRadius: props.borderRadius,
        objectFit: props.objectFit,
        objectPosition: props.objectPosition,
      }}
      loading="lazy"
    />
  );
}
