"use server";

import { revalidatePath } from "next/cache";
import { CreateWatchlistDto, Watchlist } from "@/types";
import { redirect } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL;

export async function getWatchlists(): Promise<Watchlist[]> {
  const res = await fetch(`${BACKEND_URL}/api/watchlist`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error fetching watchlists");
  return res.json();
}

export async function getWatchlist(id: string): Promise<Watchlist> {
  const res = await fetch(`${BACKEND_URL}/api/watchlist/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error fetching watchlist");
  return res.json();
}

export async function createWatchlist(
  prevState: {error?: string},
  data: FormData
): Promise<{error?: string}> {
  try {
    const name = data.get("name") as string;
    const termsRaw = data.get("terms") as string;
    const termsArray = termsRaw
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .map((t) => ({ value: t }))

    const dto: CreateWatchlistDto = { name, terms: termsArray };

    const res = await fetch(`${BACKEND_URL}/api/watchlist/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  
    if (res.status !== 201) throw new Error("Error creating watchlist");
    
  } catch (error) {
    return { error: "Error al crear la lista" };
  }

  revalidatePath("/watchlists");
  revalidatePath("/");

  redirect(`/watchlists`);
}

