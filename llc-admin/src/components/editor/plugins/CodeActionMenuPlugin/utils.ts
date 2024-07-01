/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { debounce } from 'lodash'
import { Moment } from 'moment'
import { useMemo, useRef } from 'react'

export function useDebounce<T extends (...args: never[]) => void>(
  fn: T,
  ms: number,
  maxWait?: number
) {
  const funcRef = useRef<T | null>(null)
  funcRef.current = fn

  return useMemo(
    () =>
      debounce(
        (...args: Parameters<T>) => {
          if (funcRef.current) {
            funcRef.current(...args)
          }
        },
        ms,
        { maxWait }
      ),
    [ms, maxWait]
  )
}
export const getTimerFromMoment = (moment: Moment | null) => {
  if (!moment) {
    return 0
  }
  const date = moment.toDate()
  return date.getHours() * 60 + date.getMinutes()
}
