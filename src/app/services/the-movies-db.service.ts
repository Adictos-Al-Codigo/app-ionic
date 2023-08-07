import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { TwitterAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class TheMoviesDBService {

  constructor(private httpClient:HttpClient, private ngFireAuth:AngularFireAuth) { }

  Api:string = 'https://api.themoviedb.org/3/';

  // Api para estrenos

  Obtener_Estrenos(){
    return this.httpClient.get(this.Api + "movie/now_playing?api_key=435a680aac6331beaf591ad78cfc73f9&language=es-ES&page=1&adult=true");
  }

  // Api para carteleras
  Obtener_Cartelera(NumPag:String){
    return this.httpClient.get(this.Api + "movie/upcoming?api_key=43bb95cae941badc90476b9f10f04134&language=es-ES&page=" + NumPag + "&adult=true");
  }

  // Api para Búsqueda
  Obtener_Busqueda(Query:string,NumPagina:String){
    return this.httpClient.get(this.Api + "search/movie?api_key=435a680aac6331beaf591ad78cfc73f9&language=es-ES&query=" + Query + "&page=" + NumPagina + "&include_adult=true")
  }

  // Api para detalle de la película

  Obtener_Detalle(idPelicula:string){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/" + idPelicula + "?api_key=435a680aac6331beaf591ad78cfc73f9&language=es-ES");
  }

  // Api para los fotogramas de la película

  Obtener_Fotogramas(idPelicula:string){
    return this.httpClient.get("https://api.themoviedb.org/3/movie/" + idPelicula + "/images?api_key=435a680aac6331beaf591ad78cfc73f9")
  }

  async registerUser(email:string,password:string){
    return await this.ngFireAuth.createUserWithEmailAndPassword(email,password)
  }

  async loginUser(email:string,password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email,password);
  }

  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email);
  }

  async signOut(){
    return await this.ngFireAuth.signOut();
  }

  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.ngFireAuth.onAuthStateChanged((user) => {
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  }

      // Sign in with Twitter
      TwitterAuth() {
        return this.AuthLogin(new TwitterAuthProvider());
      }
  
  
      // Auth logic to run auth providers
      AuthLogin(provider) {
        return this.ngFireAuth
          .signInWithPopup(provider)
          .then((result) => {
            console.log('You have been successfully logged in!');
          })
          .catch((error) => {
            console.log(error);
          });
      }

          // Sign in with Google
    GoogleAuth() {
      return this.AuthLogin2(new GoogleAuthProvider());
    }

      // Auth logic to run auth providers
  AuthLogin2(provider) {
    return this.
    ngFireAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
    
}
