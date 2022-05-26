import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react"
import AmountField from "react-currency-input-field"
import { CurrencyInputProps } from "react-currency-input-field"

import { CurrencyType } from "../../../utils/currencies"
import clsx from "clsx"

/**
 * `PriceInput` interface
 */
type PriceInputProps = {
  amount?: string
  disabled?: boolean
  currency: CurrencyType
  hasVirtualFocus?: boolean
  onAmountChange: (amount?: string) => void

  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  onMouseDown?: MouseEventHandler<HTMLInputElement>
}

/*
 * A controlled input component that renders the formatted amount
 * and the currency of the provided price.
 */
function PriceInput(props: PriceInputProps) {
  const {
    amount,
    currency,
    disabled,
    hasVirtualFocus,
    onAmountChange,
    ...rest
  } = props
  const { code, symbol_native, decimal_digits } = currency

  /* ********* COMPUTED ********* */

  // const step = 10 ** -decimal_digits
  const rightOffset = 24 + symbol_native.length * 4
  const placeholder = `0.${"0".repeat(decimal_digits)}`

  /* ********* HANDLERS ********* */

  const onChange: CurrencyInputProps["onValueChange"] = (
    value: string | undefined
  ) => {
    onAmountChange(value)
  }

  return (
    <div className="w-[314px] relative">
      <div className="absolute flex items-center h-full top-0 left-3">
        <span className="text-small text-grey-40 mt-[1px]">{code}</span>
      </div>

      <AmountField
        // step={undefined}
        value={amount}
        // disabled={disabled}
        onValueChange={onChange}
        allowNegativeValue={false}
        placeholder={placeholder}
        decimalScale={decimal_digits}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        onMouseDown={props.onMouseDown}
        // fixedDecimalLength={decimal_digits}
        style={{ paddingRight: rightOffset }}
        autoComplete="false"
        {...rest}
        className={clsx(
          `focus-visible:outline-none 
           focus-visible:bg-white focus-visible:border-violet-60
           border border-solid 
           w-full h-[40px]
           py-[10px] pl-12
           rounded-lg
           bg-grey-5
           text-gray-90
           text-right
           text-small`,

          {
            "bg-white border-violet-60": hasVirtualFocus,
            "border-grey-20": !hasVirtualFocus,
            "bg-grey-10 border-none": !hasVirtualFocus && disabled,
          },
          props.className || ""
        )}
      />

      <div className="absolute flex items-center h-full top-0 right-3">
        <span className="text-small text-grey-40 mt-[1px]">
          {symbol_native}
        </span>
      </div>
    </div>
  )
}

export default PriceInput
