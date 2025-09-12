"use server";

import { revalidatePath } from "next/cache";
import { CreateEventDto, SimulateEventDto, Event } from "@/types";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getEventsByWatchlist(watchlistId: string): Promise<Event[]> {
  const res = await fetch(`${BACKEND_URL}/api/event/watchlist/${watchlistId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error fetching events");
  return res.json()
}

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${BACKEND_URL}/api/event`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error fetching events");
  return res.json()
}

export async function createEvent(
  prevState: {error?: string},
  data: FormData
): Promise<{error?: string}> {

  const rawText = data.get("rawText") as string;
  const watchlistId = data.get("watchlistId") as string;

  const dto: CreateEventDto = { rawText, watchlistId };

  try {
    const res = await fetch(`${BACKEND_URL}/api/event/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    console.log('res',res)
    if (res.status !== 201) throw new Error("Error creating event");
  
    
  } catch (error) {
    return { error: "Error al crear el evento" };
  }
  
  revalidatePath(`/watchlists/${watchlistId}`);
  revalidatePath("/events");
  revalidatePath("/");
  
  redirect(`/watchlists/${watchlistId}`);
}

export async function simulateEvent(
  prevState: {error?: string},
  data: FormData
): Promise<{error?: string}> {
  const watchlistId = data.get("watchlistId") as string;
  
  try {
    const eventType = data.get("eventType") as SimulateEventDto['eventType'];

    const details: Record<string, string | number | undefined | File> = {
      domain: data.get("domain") || undefined,
      ip: data.get("ip") || undefined,
      malwareHash: data.get("malwareHash") || undefined,
      affectedUsers: data.get("affectedUsers")
        ? Number(data.get("affectedUsers"))
        : undefined,
    }

    const dto: SimulateEventDto = { eventType, details, watchlistId };
    
    const res = await fetch(`${BACKEND_URL}/api/event/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  
    if (res.status !== 201) throw new Error("Error simulating event");

  } catch (error) {
    return { error: "Error al simular el evento" };
  }


  revalidatePath(`/watchlists/${watchlistId}`);
  revalidatePath("/events");
  revalidatePath("/");

  redirect(`/watchlists/${watchlistId}`);
}