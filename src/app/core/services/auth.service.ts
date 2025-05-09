import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'fh_token';
  private readonly rolesKey = 'fh_roles';

  constructor() {}

  // Llama esto tras login exitoso
  login(token: string, roles: string[]) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getRoles(): string[] {
    const raw = localStorage.getItem(this.rolesKey);
    return raw ? JSON.parse(raw) : [];
  }

  hasRole(expected: string): boolean {
    return this.getRoles().includes(expected);
  }

  // (Opcional) obtener el token para peticiones HTTP
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
