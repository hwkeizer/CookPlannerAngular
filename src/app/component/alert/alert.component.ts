import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  
  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

}
