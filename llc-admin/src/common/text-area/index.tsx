import { Input } from 'antd'
import { TextAreaProps } from 'antd/lib/input'
import React, { ReactNode } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import styled from 'styled-components'

const { TextArea: AntTextArea } = Input

export interface ITextArea extends TextAreaProps {
  errors?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
  label?: string
  className?: string
  required?: boolean
  name?: string
  isGrid?: boolean
  containerClassName?: string
  labelClassName?: string
  footerActions?: ReactNode
  disableResize?: boolean
  isViewMode?: boolean
}

export const TextArea = (props: ITextArea) => {
  const {
    errors,
    label,
    className,
    required,
    name,
    isGrid,
    disabled,
    containerClassName = '',
    labelClassName,
    footerActions,
    disableResize,
    isViewMode,
    ...passProps
  } = props
  let inputGridContainerClass = 'grid grid-cols-7 gap-3'
  let labelClass = 'text-left mb-0 col-span-2 w-full '
  return (
    <TextAreaStyled>
      <div
        style={props.style}
        className={`${
          isGrid ? ` w-full ${inputGridContainerClass}` : ''
        } ${containerClassName}`}
      >
        {label && (
          <label
            className={`input__label ${
              isGrid ? labelClass : ''
            } ${labelClassName}`}
            htmlFor={name || label}
          >
            {label}
            {required && (
              <span className="required text-[#B91C1C] font-bold">*</span>
            )}
          </label>
        )}
        <div className={isGrid ? `${label ? 'col-span-5' : 'col-span-7'}` : ''}>
          <div
            className={`textarea transition-all duration-300 rounded-[0.375rem] border border-solid  ${
              disabled ? 'textarea-disabled' : ''
            } ${errors ? 'textarea-error' : ''} ${
              isViewMode ? 'textarea-view' : ''
            }`}
            tabIndex={2}
          >
            <AntTextArea
              {...passProps}
              disabled={disabled || isViewMode}
              style={{
                width: '100%',
                height: '100%',
                resize: disableResize ? 'none' : 'both',
                color: disabled ? 'rgba(226,232,240,1)' : 'black',
              }}
            />
            {!!footerActions && footerActions}
          </div>
          {errors && (
            <div
              className="grid grid-cols-7 w-full "
              style={{
                color: 'rgb(var(--color-danger)',
              }}
            >
              <div className="Input__text-error mt-2 text-sm col-span-7 sm:col-span-5">
                {errors}
              </div>
            </div>
          )}
        </div>
      </div>
    </TextAreaStyled>
  )
}

const TextAreaStyled = styled.div`
  width: 100%;

  .ant-input:focus,
  .ant-input-focused {
    border-color: transparent;
  }

  .textarea {
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    border-color: rgb(var(--color-slate-200) / var(--tw-border-opacity));
    appearance: none;

    &.textarea-view {
      &.ant-input {
        color: black;
      }
    }
  }

  .textarea:focus,
  .textarea:active,
  .textarea:focus-within,
  .textarea:focus-visible {
    outline: 0;
    border-color: rgb(var(--color-primary) / var(--tw-border-opacity));
    --tw-border-opacity: 0.4;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: rgb(var(--color-primary) / var(--tw-ring-opacity));
    --tw-ring-opacity: 0.2;
  }

  textarea {
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 0.375rem;
  }

  textarea.ant-input-focused,
  textarea.ant-input:focus {
    box-shadow: none;
    border-right-width: 0;
    outline: 0;
  }

  textarea.ant-input[disabled] {
    color: #000;
    background-color: #fff;
    cursor: not-allowed;
  }

  .textarea-disabled:focus-within,
  .textarea-disabled:focus,
  .textarea-disabled:active,
  .textarea-disabled:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .textarea-error,
  .textarea-error:focus-within,
  .textarea-error:focus,
  .textarea-error:active,
  .textarea-error:focus-visible {
    --tw-border-opacity: 1;
    border-color: rgb(var(--color-danger) / var(--tw-border-opacity));
  }

  .textarea-error:focus-within,
  .textarea-error:focus,
  .textarea-error:active,
  .textarea-error:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
  }

  .input-text-error {
    --tw-text-opacity: 1;
    color: rgb(var(--color-danger) / var(--tw-text-opacity));
  }
`
