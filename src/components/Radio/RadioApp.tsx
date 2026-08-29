import { Radio } from "@mui/material";

interface propsRadioApp {
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: unknown;
    size?: "small" | "medium";
    disabled?: boolean;
    sx?: object;
}

export function RadioApp(props: propsRadioApp) {
    return (
        <Radio
            checked={props.checked}
            onChange={props.onChange}
            value={props.value}
            size={props.size}
            disabled={props.disabled}
            sx={props.sx}
        />
    );
}
