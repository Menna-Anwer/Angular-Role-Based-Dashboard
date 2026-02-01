import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RoleDirective } from '../../../core/directives/role.directive';
import { RoleService } from '../../../services/RoleService';
import { DataService } from '../../../services/data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Instructor } from '../../../component/instructor/instructor';
import { User } from '../../../component/user/user';
import { Admin } from '../../../component/admin/admin';
import { ROLE } from '../../../module/roles-type';

@Component({
  selector: 'app-data',
  imports: [Admin, Instructor, User],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class Data {
  data = signal<IUser[] | Post[] | Product[]>([]);
  admin = signal<IUser[]>([]);
  instructors = signal<Post[]>([]);
  users = signal<Product[]>([]);
  loading = signal(false);
  error = signal('');
  private destroyRef = inject(DestroyRef);
  private _RoleService = inject(RoleService);
  private _DataService = inject(DataService);
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    const role = this._RoleService.getRole();
    console.log("role", role)
    if (role) {
      this.loading.set(true);
      this.error.set('');
      this._DataService.getData(role).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.data.set(res);
            switch (role) {
            case ROLE.Admin:
              this.admin.set(res as IUser[]);
              break;
            case ROLE.Instructor:
              this.instructors.set(res as Post[]);
              break;
            case ROLE.User:
              this.users.set(res as Product[]);
              break;
          }
          console.log("data", res)
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      });
    }
  }
}
