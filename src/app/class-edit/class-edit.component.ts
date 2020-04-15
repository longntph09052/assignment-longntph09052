import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { SchoolService } from "../school.service";
import { ClassService } from "../class.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  schoolid;

  classForm = new FormGroup({
    id: new FormControl(null),
    schoolId: new FormControl(''),
    name: new FormControl(''),
    room_number: new FormControl(''),
    total_student: new FormControl(''),
    main_teacher: new FormControl('')
  })

  constructor(
    private schoolService: SchoolService,
    private route: Router,
    private ActiveRoute: ActivatedRoute,
    private classService: ClassService
  ) { }

  ngOnInit() {
    //lay id cua lop roi set data vao classForm
    this.ActiveRoute.paramMap.subscribe(params =>{
      let school = params.get('id');
      this.schoolid=school;
      let classId = params.get('classid');
      this.classService.getDetailClassBySchoolId(classId).subscribe(data => {
        this.classForm.setValue(data);
      })
    })
  }
  saveClass() {
    if (this.classForm.value.id != null) {
      this.classService.editClass(this.classForm.value).subscribe(data => {
        this.route.navigate(['manager/detail-school',this.schoolid]);
      });
    } else {
      this.classService.addNewClass(this.classForm.value).subscribe(data => {
        this.route.navigate(['manager/detail-school',this.schoolid]);
      });
    }
  }

}