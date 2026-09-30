import { useThemeApp } from '@/hooks/UseThemeApp';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { IconApp } from '../Icon/IconApp';
import { TextApp } from '../Text/TextApp';

export interface propsCheckBox {
    value?: boolean;
    onChange?: (value: boolean) => void;
    onChangeForm?: (key: string, value: boolean) => void;
    label?: string;
    required?: boolean;
    readOnly?: boolean;
    id?: string;
    minWidth?: string;
    marginLeft?: string;
    width?: string;
    destacar?: boolean;
    padding?: string;
    tooltip?: string;
    marginRight?: string;
}

export function CheckBoxApp(props: propsCheckBox) {
    const { cores, borderRadius } = useThemeApp();
    return (
        <FormGroup
            sx={{
                minWidth: props.minWidth,
                marginLeft: props.marginLeft,
                color: props.destacar ? cores.primary : cores.text.primary,
                width: props.width,
                backgroundColor: props.destacar ? '#dbdbdb' : undefined,
                borderRadius: borderRadius,
                marginRight: '0px',
            }}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        required={props.required}
                        readOnly={props.readOnly}
                        disabled={props.readOnly}
                        checked={props.value ?? false}
                        sx={{
                            padding: props.padding,
                        }}
                        icon={
                            <IconApp
                                icon='fluent:checkbox-unchecked-16-regular'
                                fontSize='22px'
                            />
                        }
                        checkedIcon={
                            <IconApp
                                icon='mynaui:check-square'
                                color={cores.primary.main}
                                fontSize='22px'
                            />
                        }
                        onChange={(e) => {
                            if (props.onChange) {
                                props.onChange(e.target.checked);
                            }
                            if (props.onChangeForm && props.id) {
                                props.onChangeForm(props.id, e.target.checked);
                            }
                        }}
                    />
                }
                sx={{
                    '&:hover': {
                        color: cores.primary,
                    },
                    marginRight: props.marginRight,
                }}
                label={
                    <>
                        <TextApp
                            hover={{ color: cores.primary.main }}
                            titulo={props.label ?? ''}
                        />
                    </>
                }
                color={cores.text.primary}
            />
        </FormGroup>
    );
}
