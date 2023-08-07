import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.page.html',
  styleUrls: ['./email-verification.page.scss'],
})
export class EmailVerificationPage implements OnInit {


  constructor(private theMoviesDBService:TheMoviesDBService, private router:Router, private toastController:ToastController) { }

  ngOnInit() {
  }

  async PasswordNueva(email:string){
    this.theMoviesDBService.resetPassword(email).then(async () =>{
        const toast = await this.toastController.create({
          message: 'Revisa tu Correo Electrónico',
          duration: 2000,
          position: 'bottom',
        });
    
        await toast.present();
        this.router.navigate(['/tab-inicial/cuenta']);
    }).catch(error =>{
      console.log(error);
    });
  }
}
