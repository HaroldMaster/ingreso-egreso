import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of, Subscription } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { AuthService } from "src/app/services/auth-service.service";
import * as actions from "src/app/shared/ui.actions";
import { selectUiIsLoading } from "src/app/shared/ui.selectors";
import Swal from "sweetalert2";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading$: Observable<boolean> = of(false);
  uiSubscription : Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.loginForm = this.formBuilder.group({
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", Validators.required],
    });
  }

  ngOnInit() {
   /*this.uiSubscription = this.store.select('ui').subscribe(ui => {
      console.log('UI');
      this.cargando = ui.isLoading;
      
    })*/
    this.isLoading$ = this.loginService.isLoading$;

  }
  ngOnDestroy(){
     // this.uiSubscription.unsubscribe();
  }
  loginUsuario() {
    const { correo, contrasena } = this.loginForm.value;
    this.loginService.displayLoading();
    // Swal.fire({
    //   title: "Espere por favor...",
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    console.log('call to dispatch login user??');
    this.auth.dispatchLogin(correo, contrasena);
    /* this.auth
      .loginUsuario(correo, contrasena)
      .then((user) => {
        this.loginService.hideLoading();
      //  Swal.close();
        this.router.navigate(["/"]);
      })
      .catch((error) => {
        this.loginService.hideLoading();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          //footer: '<a href>Why do I have this issue?</a>'
        });
      }); */
  }
}
