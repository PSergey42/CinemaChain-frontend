import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShowModalService {
  public showModal$ = new Subject<boolean>();

  public showModalEdit$ = new Subject<boolean>();

  public setShowModal(showModal: boolean) {
    this.showModal$.next(showModal);
  }

  public setShowModalEdit(showModalEdit: boolean) {
    this.showModalEdit$.next(showModalEdit);
  }
}
