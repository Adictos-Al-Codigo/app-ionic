import { Component, OnInit } from '@angular/core';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.page.html',
  styleUrls: ['./cartelera.page.scss'],
})
export class CarteleraPage implements OnInit {

  constructor(private theMoviesDBService:TheMoviesDBService) { }

  ngOnInit() {
    this.Obtener_Cartelera();
    this.Obtener_Estrenos();
  }

  Array_Cartelera:any;
  Array_Estrenos:any;

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
    this.theMoviesDBService.Obtener_Cartelera().subscribe({
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
}
