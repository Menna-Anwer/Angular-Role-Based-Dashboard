import { Routes } from '@angular/router';
import { Roles } from './pages/roles/roles/roles';
import { Data } from './pages/data/data/data';
import { RoleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    { path: '', component: Roles },
    { path: 'data', component: Data, canActivate: [RoleGuard] }
];
