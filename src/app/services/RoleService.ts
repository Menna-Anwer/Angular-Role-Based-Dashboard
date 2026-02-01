import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private role = signal<string | null>(null);

  setRole(role: string) {
    this.role.set(role);
  }

  getRole() {
    return this.role();
  }

}
