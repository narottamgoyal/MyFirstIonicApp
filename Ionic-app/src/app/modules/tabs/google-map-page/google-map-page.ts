import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { IGenericAddress } from 'src/app/models/user/generic-address';
import { UtilFunctions } from 'src/app/providers/services/address-parser';
import { darkStyle } from './map-dark-style';

// To access Google Map
declare var google: any;

@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map-page.html',
  styleUrls: ['./google-map-page.scss'],
})
export class GoogleMapModal {
  map: any;
  marker: any;
  geocoder: any;
  infowindow: any;
  currentAddress: IGenericAddress = {};

  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private utilFunctions: UtilFunctions,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.currentAddress = this.navParams.get('address') ?? {};
  }

  ionViewDidEnter() {
    setTimeout(async () => { await this.loadGoogleMap() }, 100);
  }

  async locateMe() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.updateMap({ lat: coordinates.coords.latitude, lng: coordinates.coords.longitude });
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Please enable the location!',
        duration: 3000
      });
      await toast.present();
    }
  }

  updateMap(coordinates: any) {
    this.geocoder.geocode({ location: coordinates })
      .then((response: any) => {
        if (response.results[0]) {
          this.map.setZoom(12);

          if (this.marker) {
            google.maps.event.clearInstanceListeners(this.marker);
            this.marker.setMap(null);
          }

          this.marker = new google.maps.Marker({
            position: coordinates,
            map: this.map,
            draggable: true
          });

          this.listenToMarkerPositionChangeEvent();

          this.marker.addListener('click', () => {
            this.infowindow.open(this.map, this.marker);
          });

          const add = this.utilFunctions.getAddressObject(response.results[0].address_components);

          this.currentAddress.city = add.city;
          this.currentAddress.country = add.country;
          this.currentAddress.postal_code = add.postal_code;
          this.currentAddress.region = add.region;
          this.currentAddress.street = add.street;
          this.currentAddress.home = add.home;
          this.currentAddress.lat = coordinates.lat;
          this.currentAddress.lng = coordinates.lng;
          this.currentAddress.formatted_address = response.results[0].formatted_address;

          this.infowindow.setContent(response.results[0].formatted_address);
          this.infowindow.open(this.map, this.marker);
        } else {
          window.alert("No results found");
        }
      })
      .catch((e: any) => window.alert("Geocoder failed due to: " + e));
  }

  private listenToThemeChange(appEl: any) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          let isDark = el.classList.contains('dark-theme');
          if (this.map && isDark) {
            this.map.setOptions({ styles: darkStyle });
          } else if (this.map) {
            this.map.setOptions({ styles: [] });
          }
        }
      });
    });

    observer.observe(appEl, { attributes: true });
  }

  private listenToMarkerPositionChangeEvent() {
    google.maps.event.addListener(this.marker, "dragend", (event: any) => {
      this.updateMap({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }, { passive: true });
  }

  async loadGoogleMap() {
    this.geocoder = new google.maps.Geocoder();
    this.infowindow = new google.maps.InfoWindow();

    const appEl: any = this.doc.querySelector('ion-app');
    const defaultCoordinates = { lat: 40.731, lng: -73.997 };
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: defaultCoordinates,
    });

    this.updateMap({ lat: this.currentAddress?.lat ?? defaultCoordinates.lat, lng: this.currentAddress?.lng ?? defaultCoordinates.lng });
    this.listenToThemeChange(appEl);
  }

  done() {
    this.cancel(this.currentAddress);
  }

  cancel(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}
