import { Term } from "./term";
import { Event } from "./event";

export interface Watchlist {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  terms: Term[];
  events: Event[];
}

export interface CreateWatchlistDto {
  name: string;
  terms: { value: string }[];
}

export interface UpdateWatchlistDto {
  name?: string;
}