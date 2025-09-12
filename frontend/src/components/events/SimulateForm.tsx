"use client"
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { useActionState } from "react"
import { simulateEvent } from "@/lib/actions/events"
import SubmitButton from "../common/SubmitButton"
import { Watchlist } from "@/types"

export default function SimulateForm({ watchlists }: { watchlists: Watchlist[] }) {
    const [state, formAction, pending] = useActionState(simulateEvent, {})
    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="eventType">Tipo de evento</Label>
                <Select name="eventType" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="suspicious_domain">Dominio sospechoso</SelectItem>
                        <SelectItem value="malware_detected">Malware detectado</SelectItem>
                        <SelectItem value="phishing_attempt">Intento de phishing</SelectItem>
                        <SelectItem value="data_breach">Fuga de datos</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="watchlistId">Seleccionar Watchlist</Label>
                <Select name="watchlistId" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Elige una lista" />
                    </SelectTrigger>
                    <SelectContent>
                        {watchlists.map((wl: Watchlist) => (
                            <SelectItem key={wl.id} value={wl.id}>
                                {wl.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="domain">Dominio</Label>
                <Input id="domain" name="domain" placeholder="example.com" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="ip">IP</Label>
                <Input id="ip" name="ip" placeholder="192.168.0.1" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="malwareHash">Malware Hash</Label>
                <Input id="malwareHash" name="malwareHash" placeholder="abc123..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="affectedUsers">Usuarios afectados</Label>
                <Input
                    id="affectedUsers"
                    name="affectedUsers"
                    type="number"
                    placeholder="10"
                />
            </div>
            <SubmitButton pending={pending} />

            {state.error && <p className="text-red-500">{state.error}</p>}
        </form>
    )
}
