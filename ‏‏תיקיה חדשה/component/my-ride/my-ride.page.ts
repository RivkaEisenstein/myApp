import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserRideService } from '../../services/UserRide/user-ride.service';
import { User } from 'src/app/modals/User.modal';
// import { NavController } from '@ionic/angular/dist/providers/nav-controller';
// import { InspectionMenuPage } from 'src/app/inspection-menu/inspection-menu.page';
import { IonNav, IonRouterOutlet, PopoverController } from '@ionic/angular';
// import { runInThisContext } from 'vm';
import { SMS } from '@ionic-native/sms/ngx';
import { RegisterService } from '../../services/Register/register.service';
import { ModalController } from '@ionic/angular';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-my-ride',
  templateUrl: './my-ride.page.html',
  styleUrls: ['./my-ride.page.scss'],
})
export class MyRidePage implements OnInit {

  @ViewChild('ref', { static: false }) ref: ElementRef;

  currentUser:User=JSON.parse(localStorage.getItem("user"));
  

  constructor(public popoverController: PopoverController,private routerOutlet: IonRouterOutlet,public modalController: ModalController,private UserRideService: UserRideService, private sms: SMS, private UserService: RegisterService) {
    console.log("hello")
    this.sms.send('416123456', 'Hello world!');

  }


  showDetails() {
    this.ref.nativeElement.innerHTML = "Roller Coaster"
  }

  changeName(){
    this.UserService.updateName(this.currentUser.UserId,this.currentUser).subscribe(res=>{
      console.log(res);
    });
  }

  async a(){
    const popover = await this.popoverController.create({
      component: HomePage,
      cssClass: 'my-custom-class',
      // event: ev,
      translucent: true
    });
    return await popover.present(); 
  }
  

  
 











  techs = [
    {
      'title': 'Angular',
      'icon': 'angular',
      'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
      'color': '#E63135'
    },
    {
      'title': 'CSS3',
      'icon': 'css3',
      'description': 'The latest version of cascading stylesheets - the styling language of the web!',
      'color': '#0CA9EA'
    },
    {
      'title': 'HTML5',
      'icon': 'html5',
      'description': 'The latest version of the web\'s markup language.',
      'color': '#F46529'
    },
    {
      'title': 'JavaScript',
      'icon': 'javascript',
      'description': 'One of the most popular programming languages on the Web!',
      'color': '#FFD439'
    },
    {
      'title': 'Sass',
      'icon': 'sass',
      'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
      'color': '#CE6296'
    },
    {
      'title': 'NodeJS',
      'icon': 'nodejs',
      'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.',
      'color': '#78BD43'
    },
    {
      'title': 'Python',
      'icon': 'python',
      'description': 'A clear and powerful object-oriented programming language!',
      'color': '#3575AC'
    },
    {
      'title': 'Markdown',
      'icon': 'markdown',
      'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
      'color': '#412159'
    },
    {
      'title': 'Tux',
      'icon': 'tux',
      'description': 'The official mascot of the Linux kernel!',
      'color': '#000'
    },
  ];
  userRides: any[] = [];
  bool: boolean = false;;


  ngOnInit() {
    // this.showDetail('Angular');
  }

  sent() {

  }

  // nav = document.querySelector('ion-nav');
  // title: any;
  // icon: any;
  // description: any = 'The official mascot of the Linux kernel!';
  // color: any = '#000';

  // change() {
  //   this.bool = false;
  // }

  // showDetail(titleNew) {
  //   console.log(titleNew);
  //   this.bool = true;
  //   for (let i = 0; i <= 8; i++) {
  //     if (titleNew == this.techs[i].title) {
  //       this.title = this.techs[i].title;
  //       this.icon = this.techs[i].icon;
  //       this.description = this.techs[i].description;
  //       this.color = this.techs[i].color;
  //     }
  //   }
  //   const tech = this.techs.find(tech => tech.title === this.title);
  //   this.nav.push('nav-detail', { tech });
  // }



}
