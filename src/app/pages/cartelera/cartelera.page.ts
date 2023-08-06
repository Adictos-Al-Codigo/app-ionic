import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';
import { register } from 'swiper/element/bundle';
register();

import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.page.html',
  styleUrls: ['./cartelera.page.scss'],
})
export class CarteleraPage implements OnInit {

  constructor(private theMoviesDBService:TheMoviesDBService,private animationCtrl:AnimationController) { }

  ngOnInit() {
    this.Obtener_Estrenos();
  }

  Array_Cartelera:any;
  Array_Estrenos:any;
  Detalle:any;
  Fotogramas:any;
  NumPag:number = 0;

  Obtener_Estrenos(){
    this.theMoviesDBService.Obtener_Estrenos().subscribe({
      next: (s) =>{
        this.Array_Estrenos = s;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  Obtener_Cartelera(){
    this.NumPag++;
    this.theMoviesDBService.Obtener_Cartelera(this.NumPag.toString()).subscribe({
      next: (s) =>{
        this.Array_Cartelera = s;
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

  isModalOpen = false;

  setOpen(isOpen: boolean,idPelicula:string) {
    this.isModalOpen = isOpen;
    this.Obtener_Detalle_Pelicula(idPelicula);
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

  
  Obtener_Detalle_Pelicula(idPelicula:string){
    this.theMoviesDBService.Obtener_Detalle(idPelicula).subscribe({
      next: (s) =>{
        this.Detalle = s;
        this.Obtener_Fotogramas(idPelicula);
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }

  Obtener_Fotogramas(idPelicula:string){
    this.theMoviesDBService.Obtener_Fotogramas(idPelicula).subscribe({
      next: (s) =>{
        this.Fotogramas = s;
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }

  onIonInfinite(ev:any) {
    this.Obtener_Cartelera();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);


  }
}
