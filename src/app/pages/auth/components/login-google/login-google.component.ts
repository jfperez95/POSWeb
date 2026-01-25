import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CredentialResponse, PromptMomentNotification} from 'google-one-tap'
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from 'src/app/commons/response.interface';
import { environment } from 'src/environments/environment';

declare var window: any;
declare var google: any;

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.scss']
})
export class LoginGoogleComponent implements OnInit {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) { }

  private clienteId = environment.clientId

  ngOnInit(): void {
    // Función para inicializar Google cuando esté listo
    const initGoogleSignIn = () => {
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        google.accounts.id.initialize({
          client_id: this.clienteId,
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: false
        });
        
        const buttonElement = document.getElementById("buttonGoogle");
        if (buttonElement) {
          google.accounts.id.renderButton(buttonElement, {
            theme: 'filled_blue',
            type: 'standard',
            size: 'large',
            text: 'continue_with',
            shape: 'circle',
            width: 300
          });
        }
        
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
      }
    };

    // Si Google ya está cargado
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      initGoogleSignIn();
    } else {
      // Esperar a que Google cargue usando el callback global
      window.onGoogleLibraryLoad = () => {
        initGoogleSignIn();
      };
      
      // Fallback: verificar periódicamente si Google ya cargó
      const checkInterval = setInterval(() => {
        if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
          clearInterval(checkInterval);
          initGoogleSignIn();
        }
      }, 100);
      
      // Limpiar el intervalo después de 10 segundos
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);
    }
  }

  async handleCredentialResponse(response: CredentialResponse){
    await this.authService.loginWithGoogle(response.credential, "Externa").subscribe(
      (res:ApiResponse) =>{
        if(res.isSuccess){
          this.ngZone.run(() =>{
            this.router.navigate(['/'])
          })
        }
      },
      (error) =>{
        console.error(error);
      }
    )
  }

}
