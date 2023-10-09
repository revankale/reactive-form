import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;

  employeeObj: EmployeeModel = new EmployeeModel()

  employeeArray: any[] = [];

  showAdd !: boolean;

  showUpadate !: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })

    this.getAllEmployee();
  }


  postEmployeeDetails() {
    this.employeeObj.firstName = this.formValue.value.firstName;
    this.employeeObj.lastName = this.formValue.value.lastName;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.mobile = this.formValue.value.mobile;
    this.employeeObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeObj)
      .subscribe((res: any) => {
        console.log(res);
        alert("employee added successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
        err => {
          alert("something wrong");
        })
  }


  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpadate = false;
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeArray = res;
      })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe((res: any) => {
        alert('employee delete');
        this.getAllEmployee();
      })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpadate = true;
    this.employeeObj.id = row.id
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  updateEmployeeDetails() {
    this.employeeObj.firstName = this.formValue.value.firstName;
    this.employeeObj.lastName = this.formValue.value.lastName;
    this.employeeObj.email = this.formValue.value.email;
    this.employeeObj.mobile = this.formValue.value.mobile;
    this.employeeObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeObj, this.employeeObj.id)
      .subscribe((res: any) => {
        alert('update sucessfuly');
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })
  }



}
