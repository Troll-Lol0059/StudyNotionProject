import React from 'react'

function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    customClasses,
}) {
  return (
    <button
    disabled={disabled}
    onClick={onclick} className={customClasses} >
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn