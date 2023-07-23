import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheMoviesDBService {

  constructor(private httpClient:HttpClient) { }

  Api:string = 'https://api.themoviedb.org/3/movie/'

  Obtener_Estrenos(){
    return this.httpClient.get(this.Api + "upcoming?api_key=43bb95cae941badc90476b9f10f04134&language=es-ES&page=1&adult=true");
  }
}
