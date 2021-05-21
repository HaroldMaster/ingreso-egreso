import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { AuthService } from "src/app/services/auth-service.service";
import * as actions from "src/app/shared/ui.actions";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", Validators.required],
    });
  }
  crearUsuario() {
    const { nombre, correo, contrasena } = this.registroForm.value;
    this.store.dispatch(actions.isLoading())
    Swal.fire({
      title: "Espere por favor...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.auth
      .crearUsuario(nombre, correo, contrasena)
      .then((user) => {
        this.store.dispatch(actions.stopLoading());
        Swal.close();
        this.router.navigate(["/login"]);
      })
      .catch((error) => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
          //footer: '<a href>Why do I have this issue?</a>'
        });
      });
  }
}
