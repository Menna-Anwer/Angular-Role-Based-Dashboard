import { Injectable, signal } from '@angular/core';
import { ROLE } from '../module/roles-type';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private role = signal<keyof typeof ROLE | null>(null);

  setRole(role: keyof typeof ROLE) {
    this.role.set(role);
  }

  getRole() {
    return this.role();
  }

}
