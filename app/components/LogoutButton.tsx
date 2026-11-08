'use client'

import { LogOut } from 'lucide-react'
import { signOut } from '../../lib/auth/actions'

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        aria-label="Wyloguj się"
        title="Wyloguj"
        className="flex items-center gap-1.5 whitespace-nowrap px-3 py-3.5 text-sm text-neutral-400 transition-all hover:text-neutral-800 md:px-4"
      >
        <LogOut size={16} strokeWidth={2} />
        <span className="hidden sm:inline">Wyloguj</span>
      </button>
    </form>
  )
}
