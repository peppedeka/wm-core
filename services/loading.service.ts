import {Injectable} from '@angular/core';
import {LoadingController, LoadingOptions} from '@ionic/angular';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {filter, mergeMap, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WmLoadingService {
  private _events$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _loading$: Observable<HTMLIonLoadingElement | null> = of(null);

  constructor(private _loadingCtrl: LoadingController) {}

  close(): void {
    this.dismiss()
      .pipe(take(1))
      .subscribe(() => {
        this._loading$ = of(null);
        this._events$.next([]);
      });
  }

  create(opts?: LoadingOptions): Observable<HTMLIonLoadingElement> {
    return from(this._loadingCtrl.create(opts));
  }

  dismiss(): Observable<boolean> {
    return this._loading$.pipe(
      filter(l => l != null),
      switchMap(loading => loading.dismiss()),
    );
  }

  message(message: string): Observable<HTMLIonLoadingElement> {
    return this._loading$.pipe(
      tap(loading => {
        if (loading != null) {
          loading.message = message;
        }
      }),
    );
  }

  present(): Observable<void> {
    return this._loading$.pipe(switchMap(loading => from(loading.present())));
  }

  show(message: string): void {
    if (this._events$.value.includes(message) === false) {
      this._events$.next([...this._events$.value, message]);
      this._loading$
        .pipe(
          mergeMap(loading => {
            const condition = loading != null;
            return condition ? this.message(message) : this.create({message});
          }),
          switchMap(loading => {
            this._loading$ = of(loading);
            return loading.present();
          }),
        )
        .subscribe(loading => {
          console.log(loading);
        });
    }
  }
}
