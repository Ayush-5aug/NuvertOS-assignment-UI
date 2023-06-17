import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { apiBaseUrl } from "../../environments/environment";
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  private compoundData = new BehaviorSubject<any>([]);
  currentData = this.compoundData.asObservable();

  sendCompoundData(data: any) {
    this.compoundData.next(data);
  }

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  editCompound(request: any) {
    return this.http
      .post<any>(`${apiBaseUrl}/compound/editCompound`, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllCompounds() {
    return this.http
      .get<any>(`${apiBaseUrl}/compound/getAllCompoundData`)
      .pipe(
        catchError(this.handleError)
      );
  }

  fetchAndSendAllMasterData() {
    this.getAllCompounds().subscribe((res: any) => {
      this.sendCompoundData(res);
    }, (err: any) => {
      this.toastr.error(err.error.err)
    })
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.toastr.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
