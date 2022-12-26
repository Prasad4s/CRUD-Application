import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.studentForm.patchValue({
          fname:res.data[0].fname,
          lname:res.data[0].lname,
          age:res.data[0].age,
          gender:res.data[0].gender,
          address:res.data[0].address,
          pmobile:res.data[0].pmobile,
        });
      });  
    }
    
  }

  studentForm = new FormGroup({
    'fname':new FormControl('',Validators.required),
    'lname':new FormControl('',Validators.required),
    'age':new FormControl('',Validators.required),
    'gender': new FormControl('',Validators.required),
    'address':new FormControl('',Validators.required),
    'pmobile':new FormControl('',Validators.required),

  });

  //create new user
  studentSubmit()
  {
    if(this.studentForm.valid)
    {
      console.log(this.studentForm.value);
      this.service.createData(this.studentForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.studentForm.reset();
        this.successmsg = res.message;

      });
    }
    else{
      this.errormsg='all field is required! ';
    }
  }

  //update data
  studentUpdate(){
    console.log(this.studentForm.value,'updatedform');

    if(this.studentForm.valid){
      this.service.updateData(this.studentForm.value,this.getparamid).subscribe((res)=>{
        console.log(res,'resupdated');
        this.successmsg = res.message;
      });
    }else{
      this.errormsg = 'all field is required';
    }
  }
}
