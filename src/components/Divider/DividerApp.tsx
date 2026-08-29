import { Divider } from "@mui/material";
import { ChipApp } from "../Chip/ChipApp";

interface propsDividerApp {
  chip?: string;
  width?: string;
}

export function DividerApp(props: propsDividerApp) {
  if (props.chip) {
    return (
      <Divider sx={{ width: props.width }}>
        <ChipApp label={props.chip} />
      </Divider>
    );
  }

  return <Divider sx={{ width: props.width }} />;
}
