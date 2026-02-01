import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _HttpClient= inject(HttpClient);
  private readonly API_MAP: { [key: string]: string } = {
    Admin: 'https://jsonplaceholder.typicode.com/users',
    Instructor: 'https://jsonplaceholder.typicode.com/posts',
    User: 'https://fakestoreapi.com/products',
  };

  private getApiUrl(role: string): string {
    return this.API_MAP[role];
  }

  getData<T = any[]>(role: string): Observable<T> {
    const url = this.getApiUrl(role);
    return this._HttpClient.get<T>(url).pipe(
      catchError(error => {
        console.error(`[DataService] Error fetching data for role: ${role}`, error);
        return throwError(() => error);
      })
    );
  }
}
