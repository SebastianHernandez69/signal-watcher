"use client"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useActionState } from "react"
import { createWatchlist } from "@/lib/actions/watchlists"
import SubmitButton from "../common/SubmitButton"

export default function WatchlistForm() {
    const [state, formAction, pending] = useActionState(createWatchlist, {})
    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label 
                    htmlFor="name"
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Nombre de la lista
                </Label>
                <Input 
                    id="name" 
                    name="name" 
                    placeholder="Threat Intelligence Feed" 
                    required 
                />
            </div>
            <div className="space-y-2">
                <Label 
                    htmlFor="terms"
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Términos (separados por coma)
                </Label>
                <Input 
                    id="terms" 
                    name="terms" 
                    placeholder="malware, phishing, breach, suspicious, attack" 
                />
            </div>
            <SubmitButton pending={pending} />
            {state.error && <p className="text-red-500">{state.error}</p>}
        </form>
    )
}