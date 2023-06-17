import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompoundService } from '../services/compound.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  compoundList : any;
  compoundListToDisplay: any;
  currentPageNumber: number = 1;
  totalPages: number = 0;
  step: number = 5;

  constructor(private compoundService: CompoundService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.compoundService.currentData.subscribe((res: any) => {
      this.compoundList = res
      this.compoundListToDisplay = this.compoundList.slice(0,5);
      this.totalPages = this.compoundList.length / this.step;
    }, (err: any) => {
      this.toastr.error(err.error.err)
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPageNumber = pageNumber
    let lastIndex: number = pageNumber * this.step - 1;
    let startIndex: number = lastIndex - this.step + 1;
    this.compoundListToDisplay = this.compoundList.slice(startIndex, lastIndex + 1);
  }

  onPreviousPage() {
    this.currentPageNumber = this.currentPageNumber === 1 ? this.totalPages : this.currentPageNumber - 1
    let lastIndex: number = this.currentPageNumber * this.step - 1;
    let startIndex: number = lastIndex - this.step + 1;
    this.compoundListToDisplay = this.compoundList.slice(startIndex, lastIndex + 1);
  }

  onNextPage() {
    this.currentPageNumber = this.currentPageNumber === this.totalPages ? 1 : this.currentPageNumber + 1
    let lastIndex: number = this.currentPageNumber * this.step - 1;
    let startIndex: number = lastIndex - this.step + 1;
    this.compoundListToDisplay = this.compoundList.slice(startIndex, lastIndex + 1);
  }
}
