import { Component, Input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RoleDirective } from '../../core/directives/role.directive';



@Component({
  selector: 'app-admin',
   imports: [CardModule, RoleDirective],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  @Input() admin: IUser[] = [];
}
  