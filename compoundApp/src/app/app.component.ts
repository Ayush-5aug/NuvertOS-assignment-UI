import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompoundService } from './services/compound.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private compoundService: CompoundService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.compoundService.fetchAndSendAllMasterData();
  }
 
}
