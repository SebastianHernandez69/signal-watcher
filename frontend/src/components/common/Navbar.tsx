"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-xl font-bold tracking-tight cursor-pointer">
              Signal Watcher
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/watchlists">
            <Button variant="ghost">Ver Listas</Button>
          </Link>
          <Link href="/events/create">
            <Button variant="default">Crear Evento</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
