import { Component, OnInit } from '@angular/core';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';


@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.page.html',
  styleUrls: ['./cartelera.page.scss'],
})
export class CarteleraPage implements OnInit {

  constructor(private theMoviesDBService:TheMoviesDBService) { }

  ngOnInit() {
    this.Obtener_Estrenos();
  }

  Array_Estrenos:any;

  Obtener_Estrenos(){
    this.theMoviesDBService.Obtener_Estrenos().subscribe({
      next: (s) =>{
        this.Array_Estrenos = s;
      },
      error: (err) =>{
        console.error(err);
      }
    })
  }
}
