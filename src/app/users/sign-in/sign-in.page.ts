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

  constructor(private formBuilder:FormBuilder, private loadingCtrl:LoadingController, private theMoviesDBService:TheMoviesDBService, private router:Router) { }

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

  login(){
    console.log(this.LoginForm.value);
  }

}
