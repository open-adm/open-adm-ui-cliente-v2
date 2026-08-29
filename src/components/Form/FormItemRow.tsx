import { propsFormRow } from "@/types/Form";
import { Grid } from "@mui/material";

export function FormItemRow(props: propsFormRow) {
  return (
    <Grid
      size={{ xs: props.xs, md: props.md, sm: props.sm }}
      sx={{ marginTop: props.marginTop }}
    >
      {props.children}
    </Grid>
  );
}
