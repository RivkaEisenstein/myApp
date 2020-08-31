import { Component, OnInit, Input } from '@angular/core';
import { Ride } from 'src/app/modals/Ride.modal';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesService } from 'src/app/services/Rides/rides.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {

  id: number;
  rides: Ride[] = [];
  @Input() rideId: number;

  constructor(public route: Router, public modalController: ModalController, private activatedRoute: ActivatedRoute, private ridesService: RidesService) { }

  ngOnInit() {
    this.getRides();
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  async dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    //     const { data } = await onWillDismiss();
    // console.log(data);
  }

  navigation() {
    debugger;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['/rides'])
  }

  getRides() {
    this.ridesService.getRides().subscribe(rides => {
      this.rides = rides;
      this.rides.forEach(element => {
        element.TimeEvening = [];
      });
      console.log(this.rides);
      // this.getAvg();
      // this.initRideAvg();
    }, err => {
      console.log(err);
    })
  }

}


