import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import NewEventForm from "@/components/events/EventForm"
import { getWatchlists } from "@/lib/actions/watchlists"

export default async function NewEventPage() {
    const watchlists = await getWatchlists()

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle>Crear evento manual</CardTitle>
                </CardHeader>
                <CardContent>
                    <NewEventForm watchlists={watchlists} />
                </CardContent>
            </Card>
        </div>
    )
}
