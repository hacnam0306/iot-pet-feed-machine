import { Control, Controller } from 'react-hook-form'
import { IInputProps, Input } from 'src/common'

export const HookFormInput = ({
  control,
  controlName,
  ...props
}: Omit<IInputProps, 'value' | 'errors'> & {
  control: Control<any, any>
  controlName: string
}) => {
  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Input
            {...props}
            value={value}
            onChange={(e) => {
              onChange(e?.target?.value)
              if (props?.onChange) {
                props.onChange(e)
              }
            }}
            errors={error?.message}
          />
        )
      }}
    />
  )
}

