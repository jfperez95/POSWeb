import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconsService } from '@shared/services/icons.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  inputType = "password";
  visible = false;

  icVisibility: any;
  icVisibilityOff: any;

  initForm(): void {
    this.form = this.fb.group({
      email: ["admin", [Validators.required]],
      password: ["admin", [Validators.required]]
    })
  }

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private cd: ChangeDetectorRef,
    private iconsService: IconsService
  ) {
    this.icVisibility = this.iconsService.getIcon("icVisibility");
    this.icVisibilityOff = this.iconsService.getIcon("icVisibilityOff");
  }

  ngOnInit(): void {
    this.initForm();
  }

  login() : void{
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(constrols=>{
        constrols.markAllAsTouched();
      })
    }

    this.authService.login(this.form.value, "Interno").subscribe(res=>{
      if(res.isSuccess){
        this.router.navigate(["/"]);
      }
    })
  }

  toggleVisibility(){
    if(this.visible){
      this.inputType = "password";
      this.visible = false;
      this.cd.markForCheck();
    }else{
      this.inputType = "text";
      this.visible = true;
      this.cd.markForCheck();
    }
  }

}
