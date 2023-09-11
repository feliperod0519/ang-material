import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupName} from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = {} as FormGroup;

  constructor(private formBuilder:FormBuilder){
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        'email': new FormControl(null,[Validators.required,Validators.email]),
        'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }

  onSubmit(){
    const loginInfo:{'email':string,'password':string} = this.loginForm.value;
    console.log(loginInfo);
  }
}
