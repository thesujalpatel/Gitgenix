// Helper functions for date manipulation and UTC helpers
export function toUTCDay(date: Date): number {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).getUTCDay();
}

export function toUTCStartOfDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function getStartingSunday(date: Date): Date {
  const utcDate = toUTCStartOfDay(date);
  // weekStartsOn: 0 (Sunday)
  const day = utcDate.getUTCDay();
  return new Date(utcDate.getTime() - day * 24 * 60 * 60 * 1000);
}
