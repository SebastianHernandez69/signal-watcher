"use client"

import { createEvent } from "@/lib/actions/events"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useActionState } from "react"
import SubmitButton from "../common/SubmitButton"
import { Watchlist } from "@/types"

export default function NewEventForm({ watchlists }: { watchlists: Watchlist[] }) {
    const [state, formAction, pending] = useActionState(createEvent, {})

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="rawText">Texto del evento</Label>
                <Input
                    id="rawText"
                    name="rawText"
                    placeholder="Critical security breach detected on financial..."
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="watchlistId">Seleccionar Watchlist</Label>
                <Select name="watchlistId" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Elige una lista" />
                    </SelectTrigger>
                    <SelectContent>
                        {watchlists.map((wl) => (
                            <SelectItem key={wl.id} value={wl.id}>
                                {wl.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <SubmitButton pending={pending} />

            {state.error && <p className="text-red-500">{state.error}</p>}
        </form>
    )
}
