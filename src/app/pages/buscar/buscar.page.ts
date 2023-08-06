import { Component, OnInit } from '@angular/core';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';
import { AnimationController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor(private theMoviesDBService:TheMoviesDBService,private animationCtrl: AnimationController,private router:Router) { }



  Busqueda:any;
  Detalle:any;
  Fotogramas:any;
  NumPagina:number = 1;
  ValorString!:string;

  ngOnInit() {
    this.handleInput("Doraemon");
  }

  handleInput(Query:any) {
    let query;

    if (Query.value) {
      query = Query.value.toLowerCase();
      this.ValorString = query;
    }else{
      query = "Dragón Ball";
      this.ValorString = query;
    }
    
    this.theMoviesDBService.Obtener_Busqueda(query,"1").subscribe({
      next: (s) =>{
        this.Busqueda = s;
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }

  

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

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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

  private generateItems() {
    this.NumPagina++;
    this.theMoviesDBService.Obtener_Busqueda(this.ValorString,this.NumPagina.toString()).subscribe({
      next: (s) =>{
        this.Busqueda = s;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  onIonInfinite(ev:any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
