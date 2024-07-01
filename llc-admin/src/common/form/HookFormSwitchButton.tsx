import { SwitchProps } from 'antd'
import { Control, Controller } from 'react-hook-form'
import { SwitchButton } from 'src/common'

export const HookFormSwitchButton = ({
  control,
  controlName,
  ...props
}: SwitchProps & {
  control: Control<any, any>
  controlName: string
}) => {
  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <SwitchButton
            {...props}
            checked={value}
            onChange={(checked, event) => {
              onChange(checked)
              if (props?.onChange) {
                props.onChange(checked, event)
              }
            }}
          />
        )
      }}
    />
  )
}
