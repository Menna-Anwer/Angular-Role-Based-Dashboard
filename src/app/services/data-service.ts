import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ROLE } from '../module/roles-type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _HttpClient= inject(HttpClient);
  private readonly API_MAP: { [key: string]: string } = {
    Admin: `${environment.jsonplaceholderUrl}users`,
    Instructor: `${environment.jsonplaceholderUrl}posts`,
    User: `${environment.fakestoreapiUrl}products`,
  };

  private getApiUrl(role: string): string {
    return this.API_MAP[role];
  }

  getData<T = any[]>(role: ROLE): Observable<T> {
    const url = this.getApiUrl(role);
    return this._HttpClient.get<T>(url).pipe(
      catchError(error => {
        console.error(`[DataService] Error fetching data for role: ${role}`, error);
        return throwError(() => error);
      })
    );
  }
}
