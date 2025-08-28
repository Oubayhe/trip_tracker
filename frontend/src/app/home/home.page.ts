import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import * as L from 'leaflet';
import { GpsService } from '../services/gps-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonButton,
  ],
})
export class HomePage {
  private map!: L.Map;
  private latlngs: L.LatLngTuple[] = []
  private gpsData: any[] = []
  private marker!: L.Marker
  private animationFrameId: number | null = null
  private isAnimating = false
  private currentIndex = 0

  constructor(private gpsService: GpsService) {}

  ionViewDidEnter() {
    this.initMap()
    this.gpsService.getAllCoordinates().subscribe((data) => {
      if (!data || data.length === 0) return;

      this.gpsData = data;
      this.latlngs = data.map(d => [d.latitude, d.longitude])

      this.plotPolyline(this.latlngs)
    })

  }

  private initMap(): void {
    this.map = L.map('map').setView([35.62224166666667, 10.737660000000002], 20)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private plotPolyline(latlngs: L.LatLngTuple[]): void {
    const polyline = L.polyline(latlngs, { color: 'blue'}).addTo(this.map)
    this.map.fitBounds(polyline.getBounds())
  }

    startAnimation(): void {
    if (!this.latlngs || this.latlngs.length < 2 || this.isAnimating) return;

    if (this.currentIndex >= this.latlngs.length - 1) {
      this.currentIndex = 0;
      if (this.marker) this.marker.setLatLng(this.latlngs[0]);
    }

    this.isAnimating = true;

    if (!this.marker) {
      this.marker = L.marker(this.latlngs[this.currentIndex]).addTo(this.map);
      const tooltip = L.tooltip({ permanent: true, direction: 'top', offset: [0, -20] })
        .setContent(this.getMarkerInfo(this.currentIndex));
      this.marker.bindTooltip(tooltip).openTooltip();
    }

    this.animateSegment(this.currentIndex, this.currentIndex + 1);
  }

  stopAnimation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isAnimating = false;
  }

  restartAnimation(): void {
    this.stopAnimation();
    this.currentIndex = 0;
    if (this.marker) this.marker.setLatLng(this.latlngs[0]);
    this.startAnimation();
  }


  private animateSegment(startIdx: number, endIdx: number): void {
    const start = this.latlngs[startIdx];
    const end = this.latlngs[endIdx];

    const startTime = new Date(this.gpsData[startIdx].date).getTime();
    const endTime = new Date(this.gpsData[endIdx].date).getTime();
    const realDuration = endTime - startTime;
    const speedFactor = 1800;
    const duration = Math.max(realDuration / speedFactor, 10);

    let startAnimationTime: number | null = null;

    const step = (timestamp: number) => {
      if (!this.isAnimating) return;
      if (!startAnimationTime) startAnimationTime = timestamp;

      const progress = Math.min((timestamp - startAnimationTime) / duration, 1);
      const lat = start[0] + (end[0] - start[0]) * progress;
      const lng = start[1] + (end[1] - start[1]) * progress;

      this.marker.setLatLng([lat, lng]);
      this.map.setView([lat, lng], this.map.getZoom(), { animate: false });
      this.marker.getTooltip()?.setContent(this.getMarkerInfo(endIdx));

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      } else {
        this.currentIndex = endIdx;
        if (this.currentIndex < this.latlngs.length - 1) {
          this.animateSegment(this.currentIndex, this.currentIndex + 1);
        } else {
          this.isAnimating = false;
        }
      }
    };

    this.animationFrameId = requestAnimationFrame(step);
  }



  private getMarkerInfo(idx: number): string {
    const point =this.gpsData[idx]
    return `
      <b>Tram ID:</b> ${point.tramId} <brs>
      <b>Speed:</b> ${point.speed} <br>
      <b>Odometer:</b> ${point.odo} <br>
      <b>Time:</b> ${new Date(point.date).toLocaleTimeString()} <br>
    `
  }

}
