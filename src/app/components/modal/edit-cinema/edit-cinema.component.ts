import { Component } from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {EditModalService} from "../../../service/edit-modal.service";
import {Cinema} from "../../../models/cinema";

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
  styleUrls: ['./edit-cinema.component.css']
})
export class EditCinemaComponent {
  showModal?: boolean;

  cinema: Cinema = {id: "", name: "", address: ""}

  constructor(
    private readonly showModalService: ShowModalService,
    private readonly editModalService: EditModalService
  ) {
    this.showModalService.showModalEdit$.subscribe((showModalEdit) => this.showModal = showModalEdit);
    this.editModalService.cinema.subscribe((cinema) => this.cinema = cinema);
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModalEdit(showModal);
  }

  public saveEditFilmSchedule(showModalEdit: boolean) {
    this.showModalService.setShowModalEdit(showModalEdit);
    this.editModalService.setEditCinema(this.cinema)
  }

  public cancelEditFilmSchedule(showModalEdit: boolean) {
    this.showModalService.setShowModalEdit(showModalEdit);
  }
}
