import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { User } from 'src/app/modals/User.modal';
import { LoginPage } from '../login/login.page';
import { UserService } from 'src/app/services/User/user.service';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.page.html',
  styleUrls: ['./nav-bar.page.scss'],
})
export class NavBarPage implements OnInit {

  currentUser: User = new User();
  userWithToken:User;

  constructor(private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertController: AlertController,
    private AuthService: AuthService,
    private UserService: UserService) { }

  ngOnInit() {
  }

  routeRides() {
    this.router.navigate(['/rides']);
  }

  routeLogin() {
    this.alertLogin();
    this.router.navigate(['/login']);
  }

  routeRegister() {
    this.router.navigate(['/register']);
  }

  routeMyRides() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/my-rides']);
  }

  routeMyRide() {
    this.router.navigate(['/my-ride']);
  }

  async openMenu() {
    await this.menu.open();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async alertLogin() {
    const alert = await this.alertController.create({
      header: 'LOGIN',
      cssClass: 'my-custom-class',
      inputs: [{
        name: "name",
        type: "text",
        placeholder: "Enter name user"
      }, {
        name: "tz",
        type: "text",
        placeholder: "Enter name tz"
      }],
      buttons: [{
        text: 'ENTER',
        handler: data => {
          this.currentUser.UserName = data.name;
          this.currentUser.Tz = data.tz;
          this.login();
        }
      }]
    });

    await alert.present();
  }

  async alertLoginSuccesfull() {
    const alert = await this.alertController.create({
      header: 'Hellow ' + this.currentUser.UserName + '.',
      cssClass: 'my-custom-class',
      message: 'We hope that you enjoy in our asument'
    });

    await alert.present();
  }

  login()
   {
    this.UserService.getUser(this.currentUser).subscribe((user: any) => {
      if (user != null) {
        this.currentUser = user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(this.currentUser));
        this.alertLoginSuccesfull();
        this.router.navigate(['/rides']);
      }
      else {
        this.router.navigate(['/register']);
      }
    });
 

    // this.AuthService.login(this.currentUser.UserName, this.currentUser.Tz).subscribe(res => {
    //   localStorage.setItem("Token",JSON.stringify(res));
    //   this.router.navigate(['/rides']);
    // },
    //   (err: any) => {
    //     this.alertError(err.error.message);
    //   }
     
    // )
  }

  async alertError(messege) {
    const alert =await this.alertController.create({
      header: 'Error',
      cssClass: 'my-custom-class',
      message:messege

    })
    await alert.present();
  }


  logOut(){
    this.AuthService.logout();
  }
}
