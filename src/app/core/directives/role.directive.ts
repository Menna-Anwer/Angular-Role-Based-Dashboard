import {
  Directive,
  effect,
  inject,
  Input,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { RoleService } from '../../services/RoleService';
import { ROLE } from '../../module/roles-type';

@Directive({
  selector: '[appRole]',
  standalone: true,
})
export class RoleDirective {
  private readonly roles = inject(RoleService);
  private readonly template = inject(TemplateRef<unknown>);
  private readonly views = inject(ViewContainerRef);
  private readonly requiredRole = signal<keyof typeof ROLE | null>(null);

  @Input() set appRole(role: keyof typeof ROLE) {
    this.requiredRole.set(role);
  }

  constructor() {
    effect(() => {
      const role = this.requiredRole();
      const matches = role !== null && this.roles.getRole() === role;

      if (matches && this.views.length === 0) {
        this.views.createEmbeddedView(this.template);
      } else if (!matches) {
        this.views.clear();
      }
    });
  }
}
