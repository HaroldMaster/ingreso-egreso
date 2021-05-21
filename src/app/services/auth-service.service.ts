import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import {map} from 'rxjs/operators'
import { actionLogin } from '../auth/state/auth.actions';
import { Usuario } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private fireStore: AngularFirestore, private store: Store) { }

  crearUsuario(nombre: string, email:string, password:string){
    console.log('n', nombre, 'e', email, 'p', password)
    return this.auth.createUserWithEmailAndPassword(email, password)
    .then( ({user})=> {
      const newUser = new Usuario(user.uid, nombre, user.email);
      this.fireStore.doc(`${user.uid}/usuario`).set({...newUser}).then(
        ver=>{
          console.log(ver);
          
        }
      )
    });
  }
  loginUsuario(email:string, password:string){
    return this.auth.signInWithEmailAndPassword(email, password)//.then(algo => console.log(algo)).catch(err=>console.log(err)
 //   );
  }
  logOut(){
    return this.auth.signOut();
  }
  initAuthListener(){
    this.auth.authState.subscribe(user => {
      console.log(user)
    });
  }
  isAuth(){
    return this.auth.authState.pipe(
      map(fireUser => fireUser != null )
    )
  }

  dispatchLogin(email: string, password: string): void {
    console.log('dispatch login action');
    this.store.dispatch(actionLogin({payload: {email, password}}));
  }
}

