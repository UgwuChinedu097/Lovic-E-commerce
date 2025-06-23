import React from "react"
import clsx from "clsx"

const Skeleton = ({ className }) => {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-700",
        className
      )}
    />
  )
}

export default Skeleton
