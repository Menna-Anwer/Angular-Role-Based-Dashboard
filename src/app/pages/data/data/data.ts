import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RoleDirective } from '../../../core/directives/role.directive';
import { RoleService } from '../../../services/RoleService';
import { DataService } from '../../../services/data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-data',
 imports: [CommonModule, CardModule, RoleDirective],
  templateUrl: './data.html',
  styleUrl: './data.css',
})
export class Data {
  data = signal<User[] | Post[] | Product[]>([]);
  loading = signal(false);
  error = signal('');
  private destroyRef = inject(DestroyRef);
  private _RoleService = inject(RoleService);
  private _DataService = inject(DataService);
  ngOnInit() {
    this.loadData();
  }
   get users() {
    return this.data() as User[];
  }
  get posts() {
    return this.data() as Post[];
  }
  get products() {
    return this.data() as Product[];
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
