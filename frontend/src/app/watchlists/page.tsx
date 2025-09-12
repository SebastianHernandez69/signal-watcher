import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getWatchlists } from "@/lib/actions/watchlists"

export default async function WatchlistPage() {
    const watchlists = await getWatchlists()
    
    return (
        <main className="space-y-6 container mx-auto">
            <div className="flex items-center justify-center px-4 mt-10">
                <h1 className="text-3xl font-bold">Listas de Observación</h1>
            </div>

            {watchlists.length === 0 ? (
                <Card>
                    <CardContent className="py-6 text-center text-muted-foreground">
                        No hay listas creadas todavía.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4">
                    {watchlists.map((list) => (
                        <Link key={list.id} href={`/watchlists/${list.id}`}>
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <CardTitle>{list.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {list.terms?.length || 0} términos vigilados
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
            <div className="flex w-full justify-center gap-4">
                <Link href="/watchlists/create">
                    <Button variant="outline">
                        Nueva Lista
                    </Button>
                </Link>
            </div>
        </main>
    )
}
