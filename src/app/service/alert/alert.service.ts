import { Injectable } from '@angular/core';

export enum alertType {
  success = "alert-success",
  info = "alert-info",
  warning = "alert-warning",
  error = "alert-danger"
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  show: boolean = false;
  type: string = alertType.info;
  message: string;
  timer: any;

  alert(message: string, type: alertType = alertType.info, autohide: number = 5000) {
    this.show = true;
    this.type = type;
    this.message = message;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (autohide) {
      this.timer = setTimeout(() => {
        console.log("Time out")
        this.close();
      }, autohide);
    }
  }

  close() {
    this.show = false;
  }
}
