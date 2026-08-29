import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState, ReactNode } from 'react';

interface propsDropDown {
  value?: any;
  onChange?: (key: string, newValue?: any) => void;
  label: string;
  keyLabel: string;
  size?: 'small' | 'medium';
  id: string;
  required?: boolean;
  helperText?: any;
  error?: boolean;
  values: any[];
  readonly?: boolean;
  width?: string;
  defaultValue?: any;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  renderOption?: (params: any, value: any) => ReactNode;
  desabilitarExclusao?: boolean;
  focus?: boolean;
  segundaKeyLabel?: string;
  startComponent?: ReactNode;
}

export function DropDownApp(props: propsDropDown) {
  const [value, setValue] = useState<any>(() =>
    props?.value
      ? {
          id: props?.value?.id,
          label: getLabel(props.value),
        }
      : undefined,
  );
  function getByPath(obj: any, path?: string) {
    if (!obj || !path) return undefined;
    const keys = path.split('.');
    let current = obj;
    for (const k of keys) {
      if (current == null) return undefined;
      current = current[k];
    }
    return current;
  }
  function getLabel(value: any) {
    if (!value) return '';
    const primeira = getByPath(value, props.keyLabel);
    const segunda = getByPath(value, props.segundaKeyLabel);
    if (segunda) {
      return `${primeira ?? ''} - ${segunda}`;
    }
    if (primeira) {
      return primeira;
    }

    return '';
  }
  function refreshValue() {
    if (props.value) {
      setValue({
        id: props?.value?.id,
        label: getLabel(props.value),
      });
      return;
    }

    setValue(undefined);
  }

  function renderOptions(params: any) {
    if (props.renderOption) {
      return props.renderOption(params, props.values[params['data-option-index']]);
    }
    return null;
  }

  useEffect(() => {
    refreshValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <Autocomplete
      noOptionsText="Não há registros"
      sx={{
        width: props.width,
      }}
      disableClearable={props.desabilitarExclusao}
      onChange={(_, newValue: any, reason) => {
        const newV = reason !== 'clear' ? newValue : undefined;
        setValue(newV);
        if (props.onChange) {
          props.onChange(props.id, newV?.id);
        }
      }}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      readOnly={props.readonly}
      fullWidth
      value={
        typeof value === 'string' && value.length === 0 ? null : value === undefined ? null : value
      }
      options={props.values.map((val) => {
        return {
          id: val.id,
          label: getLabel(val),
        };
      })}
      size={props.size ?? 'small'}
      renderOption={props.renderOption ? renderOptions : undefined}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus={props.focus}
          label={props.label}
          required={props.required}
          helperText={props.helperText}
          error={props.error}
          disabled={props.readonly}
          onBlur={props.onBlur}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: props.startComponent,
            },
          }}
        />
      )}
    />
  );
}
