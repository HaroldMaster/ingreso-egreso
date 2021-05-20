import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth : AuthService, private router: Router) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    })
  }
  crearUsuario(){
    const {nombre, correo, contrasena} = this.registroForm.value;
    Swal.fire({
      title: 'Espere por favor...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()}
    });
    this.auth.crearUsuario(nombre,correo, contrasena).then(user =>{
      Swal.close();
      this.router.navigate(['/login'])
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
