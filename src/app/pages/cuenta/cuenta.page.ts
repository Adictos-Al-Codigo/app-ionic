import { Component, OnInit } from '@angular/core';
import { AnimationController, ToastController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(private toastController: ToastController, private animationCtrl:AnimationController, private theMoviesDBService:TheMoviesDBService) { }

  userProfile: any | null = null;

  email:string;

  async ngOnInit() {
    this.setOpen(true);
    this.userProfile = await this.theMoviesDBService.getCurrentUser();
    this.email = this.userProfile.email;
    debugger;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async CambioContrasenaToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Tu Contraseña se Cambio con Éxito.',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async CerrarSesionToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Cerraste Sesión con Éxito.',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root!.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  async getProfile() {
    try {
      this.userProfile = await this.theMoviesDBService.getCurrentUser();
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
    }
  }


}
