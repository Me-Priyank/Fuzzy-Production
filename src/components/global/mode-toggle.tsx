'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative flex items-center justify-center" // Center icons
        >
          {/* Sun Icon */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 absolute ${
              theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
            }`}
          />
          {/* Moon Icon */}
          <Moon
            className={`h-[1.2rem] w-[1.2rem] transition-transform duration-300 absolute ${
              theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}