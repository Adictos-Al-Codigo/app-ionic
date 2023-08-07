import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AnimationOptions } from 'ngx-lottie';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  RegistroForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private loadingCtrl:LoadingController,private theMoviesDBService:TheMoviesDBService, public router:Router) { }

  ngOnInit() {
    this.RegistroForm = this.formBuilder.group({
      username : ['',Validators.required],
      email: ['',[Validators.required,Validators.email, Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")]],
      password: ['',[Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[0-8]).{8,}")]]
    })
  }

  get errorControl(){
    return this.RegistroForm?.controls;
  }

  options: AnimationOptions = {
    path: '/assets/anim/animacion_register.json',
  };

  async register(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    if (this.RegistroForm?.valid) {
        localStorage.setItem("username",this.RegistroForm.value.username);
        const user = await this.theMoviesDBService.registerUser(this.RegistroForm.value.email,this.RegistroForm.value.password).catch(error =>{
          console.log(error);
          loading.dismiss();
        })

        if (user) {
          loading.dismiss();
          this.router.navigate(['/sign-in'])
        }else{
          console.log('provide correct values.');
        }
    }
  }

}
