import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import SimulateForm from "@/components/events/SimulateForm"
import { getWatchlists } from "@/lib/actions/watchlists"

export default async function SimulateEventPage() {
    const watchlists = await getWatchlists()

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                <CardTitle>Simular evento</CardTitle>
                </CardHeader>
                <CardContent>
                    <SimulateForm watchlists={watchlists} />
                </CardContent>
            </Card>
        </div>
    )
}
