// src/components/ui/card.tsx

import React from 'react'
import { cn } from '../../lib/utils' 

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('rounded-2xl border shadow-md p-4 bg-white', className)} {...props} />
}

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('p-4', className)} {...props} />
}
