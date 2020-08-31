import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Time } from '@angular/common';
import { TimeRide } from './TimeRide';
import { Timestamp } from 'rxjs';

@Injectable({ providedIn: "root" })

export class Ride {


    public RideId: number;
    public RideName: string;
    public Image: string;
    public NumberSeets: number;
    public AgeUser: number;
    public DuringUsing: number;
    public TimeEvening: Array<TimeRide> = [];
    public Avg:Date;
    public Explain:string;
    public KindAge:string;
    degel = 0;




    constructor(private router: Router) { }


}











