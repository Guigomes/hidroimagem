import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RelatoriosService } from './services/relatorios.service';
import * as auth from 'firebase/auth';
import { AlertDialog } from './components/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hidroimagem';
  static mostrarBackButton: boolean = false;

  mostrarLoadingBar: boolean = true;

  usuario: any;
  static usuarioLogado: boolean = false;
  usuariosPermitidos: any[] = [];

  constructor(public dialog: MatDialog, private router: Router, public afAuth: AngularFireAuth, private rel: RelatoriosService, private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.addSvgIcon("logo", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/svg/Google.svg"));

    var usuario = localStorage.getItem('user');

    if (usuario !== undefined && usuario !== null) {
      this.usuario = JSON.parse(usuario);
      AppComponent.usuarioLogado = true;
      this.mostrarLoadingBar = false;

    } else {
      this.rel.buscarUsuariosPermitidos().subscribe((usuariosPermitidos: any) => {
        this.usuariosPermitidos = usuariosPermitidos;

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            console.log("logado", user);

            this.usuario = user;
            localStorage.setItem('user', JSON.stringify(this.usuario));
            this.validarUsuario();

          } else {
            var usuarioNaoLogado = localStorage.getItem('user');
          
            console.log("Não logado2", usuarioNaoLogado);
            if (usuarioNaoLogado && usuarioNaoLogado != "undefined" && usuarioNaoLogado != null) {
              this.usuario = JSON.parse(usuarioNaoLogado);
              this.validarUsuario();
            }

          }

          this.mostrarLoadingBar = false;
        }, (error: any) => {
          var usuarioNaoLogado = localStorage.getItem('user');
          alert(JSON.stringify(error));
          alert(JSON.stringify(usuarioNaoLogado));
        });



      }, (error) => {
        alert("ERROR -SUBSCRIBE " + error);
      });
    }

  }

  public logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      AppComponent.usuarioLogado = false;

      this.router.navigateByUrl('/');

    });
  }
  back() {
    this.router.navigateByUrl('/');

  }
  public setUsuarioLogado(logado: boolean) {
    AppComponent.usuarioLogado = logado;
  }

  public getMostrarBackButton(): boolean {
    return AppComponent.mostrarBackButton;
  }

  public isUsuarioLogado(): boolean {
    return AppComponent.usuarioLogado;
  }

  public googleAuth() {

    return this.AuthLogin(new auth.GoogleAuthProvider()).then((data: any) => {
      this.usuario = data.user;
      this.validarUsuario();
    });
  }

  private validarUsuario() {




    let usuarioPermitido = this.usuariosPermitidos.find((usuario: any) => usuario.email == this.usuario.email);


    console.log("usuarioEmal", this.usuario.email);

    console.log("usuarioPermitido", usuarioPermitido);
    if (usuarioPermitido) {
      AppComponent.usuarioLogado = true;
      localStorage.setItem('user', JSON.stringify(this.usuario));
    } else {


      let dialogRef = this.dialog.open(AlertDialog, {
        data: { titulo: "Usuário não Cadastrado", mensagem: "O e-mail " + this.usuario.email + " não está autorizado à acessar o sistema. Entre em contato com o responsável." }
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        this.afAuth.signOut().then(() => {
          localStorage.removeItem('user');
          AppComponent.usuarioLogado = false;
        });

      });

    }
    this.mostrarLoadingBar = false;
  }

  private AuthLogin(provider: any) {
    return this.afAuth
      .signInWithRedirect(provider)

      .catch((error) => {
        console.log("Error Sign-in", error);
      });
  }
  criarNovoRelatorio() {

    this.router.navigateByUrl('/novo');

  }


}
