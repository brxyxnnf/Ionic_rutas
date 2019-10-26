import { Component, OnInit } from '@angular/core';
// cambiando
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
puntitos: Puntos[] = [
  {
    nombre: 'Lado derecho',
    posicion: new google.maps.LatLng(-17.4217566, -66.1570968)
  },
  {
    nombre: 'Lado izquierdo',
    posicion: new google.maps.LatLng(-17.4217498, -66.1571554)
  }
];
marker: any;
markerMe: any;
distancia: any = '';
latitude: any = '';
longitude: any = '';
otraLatLng = new google.maps.LatLng(-17.4217566, -66.1570968);
  mapRef = null;
  constructor(public geolocation: Geolocation) {
  }

  ngOnInit() {
    // this.loadMap();
  }

  async GetLocation(punto: Puntos) {
      const ref = this;
      const rta = await this.geolocation.getCurrentPosition();
      const myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
      };
      if (ref.markerMe == null) {
        ref.markerMe = new google.maps.Marker({
          position: myLatLng,
          map: this.mapRef,
          title: 'aquí toy :D',
          icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
      } else {
        ref.markerMe = new google.maps.Marker({
          position: myLatLng,
          map: this.mapRef,
          title: 'aquí toy :D',
          icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
      }
      const watch = this.geolocation.watchPosition();
      watch.subscribe((position) => {
        const gps = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // ref.map.panTo(gps);
        this.mapRef.center = gps; // arreglar esto
        ref.latitude = position.coords.latitude.toString();
        ref.longitude = position.coords.longitude.toString();
        ref.distancia = google.maps.geometry.spherical.computeDistanceBetween(gps, punto.posicion);
      });
  }

  loadMap(punto: Puntos) {
    const ref = this;
    /*const rta = await this.geolocation.getCurrentPosition();
    const myLatLng = {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };*/
    const mapEle: HTMLElement = document.getElementById('map');
    if (ref.marker && ref.marker.setMap) {
      ref.marker.setMap(null);
    }
    this.mapRef = new google.maps.Map(mapEle, {
      center: punto.posicion,
      disableDefaultUI: true,
      zoom: 17
    });
    ref.marker = new google.maps.Marker({
      position: punto.posicion,
      map: this.mapRef,
      title: punto.nombre
    });
    this.GetLocation(punto);
  }

  mostrarPunto(dato: Puntos) {
    console.log(dato);
    this.loadMap(dato);
  }
}

interface Puntos {
  nombre: string;
  posicion: any;
}
