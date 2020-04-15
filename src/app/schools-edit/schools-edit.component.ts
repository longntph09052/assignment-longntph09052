import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { SchoolService } from "../school.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-schools-edit",
  templateUrl: "./schools-edit.component.html",
  styleUrls: ["./schools-edit.component.css"]
})
export class SchoolsEditComponent implements OnInit {
  schoolForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    logo: new FormControl(''),
    address: new FormControl(''),
    province: new FormControl(''),
    president: new FormControl(''),
    about: new FormControl('')
  });

  constructor(
    private schoolSevice: SchoolService,
    private route: Router,
    private ActiveRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ActiveRoute.paramMap.subscribe(params => {
      let schoolID = params.get('id');
      if (schoolID != null) {
        this.schoolSevice.getschoolById(schoolID).subscribe(data => {
          this.schoolForm.setValue(data);
        });
      }
    });
  }
  saveSchool() {
    //neu da co san id thi se update id do, neu khong thi them moi
    if (this.schoolForm.value.id != null) {
      this.schoolSevice.editSchool(this.schoolForm.value).subscribe(data => {
        this.route.navigate(['manager']);
      });
    } else {
      this.schoolSevice.addNewSchool(this.schoolForm.value).subscribe(data => {
        this.route.navigate(['manager']);
      });
    }
  }
}
