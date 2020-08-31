import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/modals/User.modal';
import { RegisterService } from '../../services/Register/register.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { TextInput }from 'ionic-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  currentUser: User = new User();
  childrensName: string[] = [];
  childernsAge: number[] = [];
  inputValue: string = '';
  private todo: FormGroup;

  @ViewChild('ref', { static: false }) ref: ElementRef;
  @ViewChild('input', { static: false }) input;


  constructor(
    private registerService: RegisterService,
    private router: Router,
    private alertController: AlertController,
    private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      Phone: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      Age: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      NumberChildren: [''],
      UserName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])]




    });

  }

  logForm() {
    console.log(this.todo.value)
  }


  ngOnInit() {
  }


  validName() {
    debugger;
    for (let i = 0; i < this.currentUser.UserName.length; i++) {
      if (isNaN(this.currentUser.UserName.charAt[i]))
        this.input.value = "no";
    }


    if (parseInt(this.input.value)) {
      this.input.value = "Must contain letters"
    }


  }

  validAge() {

  }

  validNumberChildren() {

  }

  validPhone() {

  }

  validPassword() {

  }

  arrayNumber(n: number): any[] {
    return Array(n);
  }

  updateListChildren(event) {
    console.log(this.currentUser.Children)
    for (let i = 0; i < event - 1; i++) {
      console.log(this.currentUser.Children[i])
      if (!this.currentUser.Children[i]) {
        this.currentUser.Children[i] = new User();
        console.log("new")
      }
    }
  }

  async presentAlertRegisterSuccesfull() {
    var currentUser: User = JSON.parse(localStorage.getItem("user"));
    const alert = await this.alertController.create({
      header: 'Hellow ' + currentUser.UserName + '.',
      cssClass: 'my-custom-class',
      message: 'The register moved successful.'

    });

    await alert.present();
  }

  register() {

    // this.validName();
    console.log(this.currentUser);
      this.registerService.register(this.currentUser)
        .subscribe(res => {
          console.log(res);
          this.currentUser = res;
          localStorage.setItem("user", JSON.stringify(this.currentUser));
          this.presentAlertRegisterSuccesfull();
          this.router.navigate(['/rides']);
        },
          (err) => {
            console.log(err)
          });
  }
}
