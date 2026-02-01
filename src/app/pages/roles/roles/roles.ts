import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/RoleService';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { ROLE } from '../../../module/roles-type';
@Component({
  selector: 'app-roles',
  imports: [CommonModule, FormsModule, RadioButtonModule, ButtonModule],
  templateUrl: './roles.html',
  styleUrl: './roles.css',
})
export class Roles {
  private _RoleService = inject(RoleService);
  private _Router = inject(Router);
  selectedRole: ROLE | null = null;

  roles: { name: ROLE }[] = [
    { name: ROLE.Admin },
    { name: ROLE.Instructor },
    { name: ROLE.User },
  ];

  submit() {
    if (this.selectedRole) {
      this._RoleService.setRole(this.selectedRole);
      this._Router.navigate(['/data']);
    }
  }
}
