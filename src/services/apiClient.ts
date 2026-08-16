/**
 * Central HTTP client boundary.
 *
 * UI components should not call `fetch` directly. Once the ASP.NET Core backend is
 * available, authentication headers, refresh-token handling and standard API errors
 * can be implemented here without rewriting individual pages.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:5001/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
  errors?: Array<{ field?: string; message: string }>;
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const body = (await response.json()) as ApiResponse<T>;
  return body.data;
}
