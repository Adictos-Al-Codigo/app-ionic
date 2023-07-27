import { Component, OnInit } from '@angular/core';
import { TheMoviesDBService } from 'src/app/services/the-movies-db.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor(private theMoviesDBService:TheMoviesDBService) { }



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

}
