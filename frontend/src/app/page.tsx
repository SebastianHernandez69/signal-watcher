import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, BarChart3 } from "lucide-react";
import { getWatchlists } from "@/lib/actions/watchlists";
import { getEvents } from "@/lib/actions/events";

export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  try {
    const [watchListsRes, eventsRes] = await Promise.all([
      getWatchlists(),
      getEvents(),
    ]);

    const watchLists = watchListsRes;
    const events = eventsRes;
    
    return {
      totalWatchLists: watchLists.length,
      totalEvents: events.length,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalWatchLists: 0,
      totalEvents: 0,
    };
  }
}

export default async function HomePage() {
  const stats = await getDashboardStats();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight text-center">
        Dashboard
      </h1>
      <p className="text-muted-foreground text-center">
        Resumen general de listas y eventos
      </p>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <List className="h-5 w-5 text-muted-foreground" />
              <span>Listas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalWatchLists}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
              <span>Eventos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalEvents}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Link href="/watchlists">
          <Button 
            size="lg" 
            className="px-8"
          >
            Ver Listas
          </Button>
        </Link>
        <Link href="/events/create">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8">
            Crear Evento
          </Button>
        </Link>
        <Link href="/events/simulate">
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8">
            Simular Evento
          </Button>
        </Link>
      </div>
    </main>
  );
}
