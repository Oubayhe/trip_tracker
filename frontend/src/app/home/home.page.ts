import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { GpsService } from '../services/gps-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private map!: L.Map;

  constructor(private gpsService: GpsService) {}

  ionViewDidEnter() {
    this.gpsService.getAllCoordinates().subscribe((data) => {
      console.log("Data: ", data)
    })

    this.map = L.map('map').setView([35.62, 10.73], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
