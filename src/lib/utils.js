import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import React, {useEffect, useMemo, useRef} from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const usePreRenderEffect = (runner) => {
  const cleanupRef = useRef(null)
  const shouldRemountRef = useRef(false)

  // this will trigger runner when its dependencies change
  useMemo(() => {
    if (!shouldRemountRef.current) {
      cleanupRef.current?.()
      cleanupRef.current = runner()
    }
  }, [runner])

  // this will trigger runner on a remount but not dependency change
  const shouldRemount = shouldRemountRef.current
  useMemo(() => {
    if (shouldRemount) {
      cleanupRef.current = runner()
      shouldRemountRef.current = false
    }
  }, [runner, shouldRemount])

  // when the component unmounts trigger the cleanup and set remount flag to true
  useEffect(() => () => {
    cleanupRef.current?.()
    shouldRemountRef.current = true
  }, [])
}
export { usePreRenderEffect }
