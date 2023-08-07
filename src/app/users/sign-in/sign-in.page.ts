import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  LoginForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private loadingCtrl:LoadingController, public theMoviesDBService:TheMoviesDBService, private router:Router) { }




  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email, Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      password: ['',[Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8]).{8,}")]]
    })
  }

  get errorControl(){
    return this.LoginForm?.controls;
  }

  options: AnimationOptions = {
    path: '/assets/anim/animacion_login.json',
  };

  async login(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.LoginForm?.valid) {
        const user = await this.theMoviesDBService.loginUser(this.LoginForm.value.email,this.LoginForm.value.password).catch(error =>{
          console.log(error);
          loading.dismiss();
        })

        if (user) {
          loading.dismiss();
          this.router.navigate(['tab-inicial/cuenta']);
          debugger;
        }else{
          console.log('provide correct values.');
        }
    }
  }

  onClickTwitterLogin(){
    this.theMoviesDBService.TwitterAuth().then((res) =>{
      this.router.navigate(['tab-inicial/cuenta']);
    }).catch(err =>{
      console.log(err);
    });
  }

  onClickGoogleLogin(){
    this.theMoviesDBService.GoogleAuth().then((res) =>{
      this.router.navigate(['tab-inicial/cuenta']);
    }).catch(err => {
      console.log(err);
    });
  }
}
