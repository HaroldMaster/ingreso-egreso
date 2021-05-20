import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    })
   }

  ngOnInit() {
  }
  loginUsuario(){
    const {correo, contrasena} = this.loginForm.value;
    Swal.fire({
      title: 'Espere por favor...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()}
    });
    this.auth.loginUsuario(correo, contrasena).then(user =>{
      Swal.close();
      this.router.navigate(['/'])
    } 
    ).catch(error=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        //footer: '<a href>Why do I have this issue?</a>'
      })
    })
  }

}
