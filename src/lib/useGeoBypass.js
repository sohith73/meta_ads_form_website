import { useState, useRef, useCallback } from 'react'

/**
 * Click-and-hold bypass for geo-blocked buttons, ported from the Next.js
 * site's useGeoBypass: hold a CTA for 5 seconds to bypass the geo-block.
 */
export function useGeoBypass({ onBypass, holdDuration = 5000 }) {
  const [isHolding, setIsHolding] = useState(false)
  const [holdProgress, setHoldProgress] = useState(0)
  const holdTimerRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const startTimeRef = useRef(null)

  const stopHold = useCallback(() => {
    setIsHolding(false)
    setHoldProgress(0)
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    startTimeRef.current = null
  }, [])

  const startHold = useCallback(() => {
    setIsHolding(true)
    setHoldProgress(0)
    startTimeRef.current = Date.now()

    progressIntervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current
        setHoldProgress(Math.min((elapsed / holdDuration) * 100, 100))
      }
    }, 50)

    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false)
      setHoldProgress(0)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      onBypass()
    }, holdDuration)
  }, [onBypass, holdDuration])

  const getButtonProps = useCallback(() => ({
    onMouseDown: startHold,
    onMouseUp: stopHold,
    onMouseLeave: stopHold,
    onTouchStart: startHold,
    onTouchEnd: stopHold,
    onTouchCancel: stopHold,
  }), [startHold, stopHold])

  return { isHolding, holdProgress, getButtonProps, startHold, stopHold }
}
