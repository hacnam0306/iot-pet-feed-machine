import { ICheckboxProps, SharedCheckbox } from '@components'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { Control, Controller } from 'react-hook-form'

export const HookFormCheckBox = ({
  control,
  controlName,
  ...props
}: ICheckboxProps & {
  control: Control<any, any>
  controlName: string
}) => {
  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <SharedCheckbox
            {...props}
            checked={value}
            onChange={(e: CheckboxChangeEvent) => {
              onChange(e.target.checked)
              if (props?.onChange) {
                props.onChange(e)
              }
            }}
          />
        )
      }}
    />
  )
}
