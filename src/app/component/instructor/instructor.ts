import { Component, Input, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RoleDirective } from '../../core/directives/role.directive';

@Component({
  selector: 'app-instructor',
   imports: [CardModule, RoleDirective],
  templateUrl: './instructor.html',
  styleUrl: './instructor.css',
})
export class Instructor {
  @Input() instructors: Post[] = [];
}
