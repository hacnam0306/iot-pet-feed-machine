import { IPropsSelectInput, ShareSelectInput } from '@components'
import { Control, Controller } from 'react-hook-form'

export const HookFormSelect = ({
  control,
  controlName,
  ...props
}: IPropsSelectInput & {
  control: Control<any, any>
  controlName: string
}) => {
  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <ShareSelectInput
            {...props}
            value={value}
            onChange={(selected: string) => {
              onChange(selected)
              if (props?.onChange) {
                props.onChange(selected)
              }
            }}
          />
        )
      }}
    />
  )
}
