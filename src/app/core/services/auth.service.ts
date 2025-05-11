import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient }                      from '@angular/common/http';
import { isPlatformBrowser }               from '@angular/common';
import { Observable }                      from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http       = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  loginApi(email: string, password: string): Observable<{ token: string; roles: string[] }> {
    return this.http.post<{ token: string; roles: string[] }>(
      '/api/Auth/login',
      { email, password }
    );
  }

  // Ahora registerApi devuelve void porque el endpoint /api/Auth/register no retorna body :contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}
  registerApi(email: string, password: string): Observable<void> {
    return this.http.post<void>(
      '/api/Auth/register',
      { email, password }
    );
  }

  login(token: string, roles: string[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    if (!isPlatformBrowser(this.platformId)) return [];
    const stored = localStorage.getItem('roles');
    return stored ? JSON.parse(stored) : [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
