import {Component, Input} from '@angular/core';
import {Cinema} from "../../models/cinema";
import {ShowModalService} from "../../service/show-modal.service";
import {CinemaService} from "../../service/http/cinema.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  cinemas: Cinema[] = []

  showModal = false;

  constructor(
    private cinemaService: CinemaService,
    private readonly showModalService: ShowModalService
  ) {
    this.cinemaService.cinema.subscribe(cinema => this.cinemas = cinema)
  }

  ngOnInit(): void {
    this.getCinema();
  }

  getCinema(): void {
    this.cinemaService.getCinema()
      .subscribe(cinema => this.cinemas = cinema);
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }

}
