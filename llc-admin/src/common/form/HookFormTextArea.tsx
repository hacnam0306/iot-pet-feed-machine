import { Control, Controller } from 'react-hook-form'
import { ITextArea, TextArea } from 'src/common'

export const HookFormTextArea = ({
  control,
  controlName,
  ...props
}: Omit<ITextArea, 'value' | 'errors'> & {
  control: Control<any, any>
  controlName: string
}) => {
  return (
    <Controller
      name={controlName}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <TextArea
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
