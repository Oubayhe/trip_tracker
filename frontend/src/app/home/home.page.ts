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
    this.map = L.map('map').setView([35.62, 10.73], 15)

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
    if (!this.latlngs || this.latlngs.length < 2) return;

    const marker = L.marker(this.latlngs[0]).addTo(this.map)

    const tooltip = L.tooltip({ permanent: true, direction: 'top', offset: [0, -20] })
      .setContent(this.getMarkerInfo(0))
    marker.bindTooltip(tooltip).openTooltip()

    const speedFactor = 1800
    let i = 0

    const animateSegment = (startIdx: number, endIdx: number) => {
      const start = this.latlngs[startIdx]
      const end = this.latlngs[endIdx]

      const startTime = new Date(this.gpsData[startIdx].date).getTime()
      const endTime = new Date(this.gpsData[endIdx].date).getTime()
      const realDuration = endTime - startTime
      const duration = Math.max(realDuration / speedFactor, 10)

      let startAnimationTime: number | null = null

      const step = (timestamp: number) => {
        if (!startAnimationTime) startAnimationTime = timestamp
        const progress = Math.min((timestamp - startAnimationTime) / duration, 1)

        const lat = start[0] + (end[0] - start[0])
        const lng = start[1] + (end[1] - start[1])

        marker.setLatLng([lat, lng])
        this.map.setView([lat, lng], this.map.getZoom(), { animate: false })

        tooltip.setContent(this.getMarkerInfo(endIdx))

        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          i++
          if (i < this.latlngs.length - 1) {
            animateSegment(i, i + 1)
          }
        }
      }

      requestAnimationFrame(step)
    }

    animateSegment(0, 1)

  }

  private getMarkerInfo(idx: number): string {
    const point =this.gpsData[idx]
    return `
      <b>Tram ID:</b> ${point.tramId} <br>
      <b>Speed:</b> ${point.speed} <br>
      <b>Odometer:</b> ${point.odo} <br>
      <b>Time:</b> ${new Date(point.date).toLocaleTimeString()} <br>
    `
  }
}
