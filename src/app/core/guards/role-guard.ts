import { CanActivateFn } from '@angular/router';

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoleService } from '../../services/RoleService';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private _RoleService = inject(RoleService);
  private _Router = inject(Router);

  canActivate(): boolean {
    if (this._RoleService.getRole()) {
      return true;
    }

    this._Router.navigate(['/']);
    return false;
  }
}
