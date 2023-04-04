import { Component } from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {EditModalService} from "../../../service/edit-modal.service";
import {Cinema} from "../../../models/cinema";
import {CinemaService} from "../../../service/http/cinema.service";

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
  styleUrls: ['./edit-cinema.component.css']
})
export class EditCinemaComponent {
  showModal?: boolean;

  cinema: Cinema = {id: "", name: "", address: ""}

  constructor(
    private cinemaService: CinemaService,
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
    this.cinemaService.updateCinema(this.cinema).subscribe()
    this.showModalService.setShowModalEdit(showModalEdit);
    this.editModalService.setEditCinema(this.cinema)
  }

  public cancelEditFilmSchedule(showModalEdit: boolean) {
    this.showModalService.setShowModalEdit(showModalEdit);
  }
}
