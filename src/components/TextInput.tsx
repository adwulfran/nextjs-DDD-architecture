import { TextField } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";


export default function TextInput<T extends FieldValues>(props: UseControllerProps<T>) {
    const { field, formState } = useController(props);

    return (
        <TextField
            {...field}
            label={props.name}
            variant="outlined"
            margin="normal"
            error={!!formState.errors[props.name]}
            helperText={formState.errors[props.name]?.message?.toString()}
        />
    )
}

