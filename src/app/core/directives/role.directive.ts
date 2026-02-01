import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { RoleService } from '../../services/RoleService';


@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {
 private _RoleService = inject(RoleService);
  private template = inject(TemplateRef<any>);
   private vcr = inject(ViewContainerRef);
  @Input() set appRole(role: string) {

    const current = this._RoleService.getRole();

    if (current === role) {
      this.vcr.createEmbeddedView(this.template);
    } else {
      this.vcr.clear();
    }
  }

}
