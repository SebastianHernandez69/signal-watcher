import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import WatchlistForm from "@/components/watchlists/WatchlistForm"

export default function NewWatchlistPage() {
    
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <CardTitle>Crear lista de observación</CardTitle>
                </CardHeader>
                <CardContent>
                    <WatchlistForm />
                </CardContent>
            </Card>
        </div>
    )
}
