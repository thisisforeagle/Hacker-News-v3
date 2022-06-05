import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObjectUnsubscribedError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {

  constructor(
    private _injector: Injector,
  ) { }

  error(error) {
    const _toastService = this._injector.get(ToastrService);
    _toastService.error(error || "An error occurred. Please check the console for details!");
  }
  logError(error) {
    // Write logic here to log error
  }
  handleError(error: any) {
    this.logError(error);
    this.error(error);

    if (Error instanceof HttpErrorResponse) {
      console.log(error.status);
    }
    else {
      console.error("An error has occurred: ", error);
    }

    // optional: navigate to error page
    //const router = this._injector.get(Router);
    //router.navigate(['error']);
  }
}
