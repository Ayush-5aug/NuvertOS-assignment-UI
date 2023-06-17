import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute }  from "@angular/router";
import { CompoundService } from '../services/compound.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  compoundInfo : any;
  editForm: FormGroup;
  
  constructor(private compoundService: CompoundService, private toastr: ToastrService, private route: ActivatedRoute) {
    this.editForm = new FormGroup({
      compoundName: new FormControl("", [Validators.required]),
      compoundDescription: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
      attribute: new FormControl(""),
      dateModified: new FormControl(new Date())
  });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.compoundService.currentData.subscribe((res) => {
      this.compoundInfo = res[id - 1];
      this.editForm.controls['compoundName'].setValue(this.compoundInfo['compundName']);
      this.editForm.controls['compoundDescription'].setValue(this.compoundInfo['compundDescription']);
      this.editForm.controls['image'].setValue(this.compoundInfo['image']);
      this.editForm.controls['attribute'].setValue(this.compoundInfo['attribute']);
    }, (err: any) => {
      this.toastr.error(err.error.err)
    });
  }

  onSubmitForm() {
    let requestBody = {
      id: this.route.snapshot.params['id'],
      compundName: this.editForm.value.compoundName,
      compundDescription: this.editForm.value.compoundDescription,
      image: this.editForm.value.image,
      attribute: this.editForm.value.attribute,
      dateModified: this.editForm.value.dateModified
    }
    this.compoundService.editCompound(requestBody).subscribe((response: any) => {
      this.toastr.success("Compound Details updated for ID " + this.route.snapshot.params['id']);
      document.getElementById("closeBtn")?.click();
      this.compoundService.fetchAndSendAllMasterData();
    }, (err: any) => {
      this.toastr.error(err.error)
    })
  }
}
