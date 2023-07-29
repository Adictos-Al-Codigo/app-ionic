import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheMoviesDBService {

  constructor(private httpClient:HttpClient) { }

  Api:string = 'https://api.themoviedb.org/3/';

  // Api para estrenos

  Obtener_Estrenos(){
    return this.httpClient.get(this.Api + "movie/now_playing?api_key=435a680aac6331beaf591ad78cfc73f9&language=es-ES&page=1&adult=true");
  }

  // Api para carteleras
  Obtener_Cartelera(){
    return this.httpClient.get(this.Api + "movie/upcoming?api_key=43bb95cae941badc90476b9f10f04134&language=es-ES&page=1&adult=true");
  }

  // Api para Búsqueda
  Obtener_Busqueda(Query:string){
    return this.httpClient.get(this.Api + "search/movie?api_key=435a680aac6331beaf591ad78cfc73f9&language=es-ES&query=" + Query + "&page=1&include_adult=true")
  }

  // Api para detalle de la película

  Obtener_Detalle(idPelicula:string){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/" + idPelicula + "?api_key=435a680aac6331beaf591ad78cfc73f9&language=es-ES");
  }

  // Api para los fotogramas de la película

  Obtener_Fotogramas(idPelicula:string){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/" + idPelicula + "/images?api_key=435a680aac6331beaf591ad78cfc73f9")
  }
}
