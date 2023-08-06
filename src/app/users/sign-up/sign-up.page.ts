import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  options: AnimationOptions = {
    path: '/assets/anim/animacion_register.json',
  };

}
