/**
 * Authentication service contract for the future ASP.NET Core identity endpoint.
 * The current prototype login is intentionally mocked in LoginPage.tsx.
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  organisationId: string;
  branchId?: string;
  roles: string[];
  permissions: string[];
}
