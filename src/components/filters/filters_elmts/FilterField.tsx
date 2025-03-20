'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { updateQueryString } from "@/shared/helpers/updateQueryString";
import { SelectProps } from "@radix-ui/react-select";

type TFormElems = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

type TProps = {
  paramName: string,
  render: (props: HTMLAttributes<TFormElems> & SelectProps & { onClick?: () => void }) => ReactNode
}

/**
 * `FilterInput` is a reusable component for filtering data using a query parameter in the URL.
 * It updates the URL query string when the input value changes.
 *
 * @component
 * @param {string} paramName - The name of the query parameter to update.
 * @param {(props: { value: string; onValueChange: (value: string) => void }) => JSX.Element} render - A render prop that provides input state and change handler.
 *
 * @example
 * ```tsx
 * <FilterInput
 *   paramName="search"
 *   render={({ value, onChange }) => (
 *     <input type="text" value={value} onChange={onChange} placeholder="Search..." />
 *   )}
 * />
 * ```
 *
 * ⚠️ **This component should be used inside a client component.**
 * Ensure that it is placed inside a component marked with `"use client"` to avoid hydration errors.
 */



const FilterField: FC<TProps> = ({
  paramName,
  render
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get(paramName) || '')

  //use ref for debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const newQS = updateQueryString(searchParams, paramName, value);
      router.push(`${pathname}?${newQS}`);
    }, 250);

    // clean timer on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [paramName, pathname, router, searchParams, value]);

  const handleChange = (value: string) => {
    console.log(value)
    setValue(value)
  }

  const resetFilter = () => {
    setValue('')
  }

  return <>{render({
    value,
    onValueChange: handleChange,
    onClick: resetFilter,
  })}</>
}

export default FilterField;