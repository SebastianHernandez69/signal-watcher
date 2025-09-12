export type EventSeverity = "LOW" | "MED" | "HIGH" | "CRITICAL";

export interface Event {
  id: string;
  rawText: string;
  summary: string;
  severity: EventSeverity;
  suggestions: string;
  createdAt: string;
  watchlistId: string;
}

export interface CreateEventDto {
  rawText: string;
  watchlistId: string;
}

export type EventType =
  | "suspicious_domain"
  | "malware_detected"
  | "phishing_attempt"
  | "data_breach";

export interface SimulateEventDto {
  eventType: EventType;
  details: {
    domain?: string;
    ip?: string;
    malwareHash?: string;
    affectedUsers?: number;
    [key: string]: string | number | undefined | File;
  };
  watchlistId: string;
}