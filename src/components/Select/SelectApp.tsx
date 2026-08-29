import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface propsSelectApp {
  opcoes: any[];
  value?: any;
  defaultValue?: any;
  label: string;
  id?: string;
  name?: string;
  onChange?: (value?: any) => void;
  keyValue: string;
  keyDescricao: string;
  width?: string;
}

export default function SelectApp(props: propsSelectApp) {
  const handleChange = (event: SelectChangeEvent) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120, width: props.width }} size="small">
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <Select
        labelId={props.id}
        id={props.id}
        value={props.value}
        label={props.label}
        onChange={handleChange}
        defaultValue={props.defaultValue}
      >
        {props.opcoes.map((opt) => (
          <MenuItem value={opt[props.keyValue]} key={opt[props.keyValue]}>
            {opt[props.keyDescricao]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
