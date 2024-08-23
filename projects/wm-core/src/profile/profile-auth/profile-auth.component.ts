import {Component} from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { LoginComponent } from 'wm-core/login/login.component';
import {isLogged} from 'wm-core/store/auth/auth.selectors';

@Component({
  selector: 'wm-profile-auth',
  templateUrl: './profile-auth.component.html',
  styleUrls: ['./profile-auth.component.scss'],
})
export class ProfileAuthComponent {
  isLogged$: Observable<boolean> = this._store.pipe(select(isLogged));
  loggedOutSliderOptions: any;

  constructor(
    private _store: Store,
    private _modalCtrl: ModalController,
    private _navCtrl: NavController
  ) {
    this.loggedOutSliderOptions = {
      initialSlide: 0,
      speed: 400,
      spaceBetween: 10,
      slidesOffsetAfter: 0,
      slidesOffsetBefore: 0,
      slidesPerView: 1,
    };
  }

  login(): void {
    this._modalCtrl
      .create({
        component: LoginComponent,
        swipeToClose: true,
        mode: 'ios',
        id: 'webmapp-login-modal',
      })
      .then(modal => {
        modal.present();
      });
  }

  signup(): void {
    this._navCtrl.navigateForward('registeruser');
  }
}
