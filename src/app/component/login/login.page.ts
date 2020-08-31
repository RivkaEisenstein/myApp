import { Component, OnInit } from '@angular/core';
import { User } from '../../modals/User.modal';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  currentUser: User = new User();
  answer: boolean = true;


  constructor(
    private router: Router,
    private userService: UserService,
    private alertController: AlertController
  ) { }



  ngOnInit() 
  {
    // this.alertLogin();
  }

  ionViewDidLoad(){
    debugger;
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

  arrayNumber(n: number): any[] {
    return Array(n);
  }

 
  async alertLoginSuccesfull() {
    const alert = await this.alertController.create({
      header: 'Hellow ' + this.currentUser.UserName + '.',
      cssClass: 'my-custom-class',
      message: 'We hope that you enjoy in our asument'
    });

    await alert.present();
  }
  
  login() {
    this.userService.getUser(this.currentUser).subscribe((user: any) => {
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
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the galaxy?',
      buttons: ['Disagree', 'Agree']
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);

  }
}