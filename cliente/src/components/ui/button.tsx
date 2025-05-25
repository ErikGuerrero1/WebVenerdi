// src/components/ui/button.tsx

import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const Button = ({ className, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(
                'px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        />
    )
}
