export const loadFromSession = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(key);
};

export const saveToSession = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  return sessionStorage.setItem(key, value);
};

export const loadJSONFromSession = (key: string) => {
  try {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const saveJSONToSession = (key: string, data: unknown) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {}
};
