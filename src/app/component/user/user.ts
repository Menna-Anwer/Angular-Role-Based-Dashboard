import { Component, Input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RoleDirective } from '../../core/directives/role.directive';

@Component({
  selector: 'app-user',
 imports: [CardModule, RoleDirective],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
@Input() users: Product[] = [];
}
