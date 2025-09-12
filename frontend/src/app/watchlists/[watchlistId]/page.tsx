import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getWatchlist } from "@/lib/actions/watchlists"
import { getEventsByWatchlist } from "@/lib/actions/events"

interface Props {
  params: Promise<{ watchlistId: string }>
}

const COLORS = {
    LOW: "bg-green-500",
    MED: "bg-yellow-500",
    HIGH: "bg-red-500",
    CRITICAL: "bg-pink-500",
}

export default async function WatchlistDetailPage({ params }: Props) {
    const { watchlistId } = await params
    const watchlist = await getWatchlist(watchlistId)
    const events = await getEventsByWatchlist(watchlistId)
    
    return (
        <div className="space-y-8 container mx-auto">
            <div className="flex items-center justify-center mt-10">
                <h1 className="text-3xl font-bold">{watchlist.name}</h1>
            </div>

            <section>
                <h2 className="text-xl font-semibold mb-3">Términos vigilados</h2>
                <div className="flex flex-wrap gap-2">
                    {watchlist.terms?.length > 0 ? (
                        watchlist.terms.map((term) => (
                            <Badge className="px-4 py-1" key={term.id} variant="secondary">
                                {term.value}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-muted-foreground">No hay términos definidos.</p>
                    )}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">Eventos recientes</h2>
                {events?.length === 0 ? (
                    <p className="text-muted-foreground">No hay eventos para esta lista.</p>
                ) : (
                <div className="space-y-3">
                    {events.map((event) => (
                        <Card key={event.id}>
                            <CardHeader>
                                <CardTitle className="text-base">{event.summary}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">
                                    {new Date(event.createdAt).toLocaleString()}
                                </p>
                                <p className="text-sm">Severidad: <span className={`font-semibold ${COLORS[event.severity]} rounded px-1 py-0.5`}>{event.severity}</span></p>
                                <p className="text-sm mt-1">Sugerencias: {event.suggestions}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                )}
            </section>
        </div>
    )
}
