import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor(private theMoviesDBService:TheMoviesDBService, private animationCtrl:AnimationController) { }



  Busqueda:any;

  ngOnInit() {
    this.handleInput("Doraemon");
  }

  handleInput(Query:any) {
    let query;

    if (Query.value) {
      query = Query.value.toLowerCase();
    }else{
      query = "Dragón Ball";
    }
    
    this.theMoviesDBService.Obtener_Busqueda(query).subscribe({
      next: (s) =>{
        this.Busqueda = s;
      },
      error: (err) =>{
        console.error(err);
      }
    })
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

}
