import {Component, Input, OnInit} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {CinemaService} from "../../../service/http/cinema.service";
import {Cinema} from "../../../models/cinema";

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit{
  showModal?: boolean;

  cinema: Cinema = {id: "", address: "", name: ""}
  constructor(
    private cinemaService: CinemaService,
    private readonly showModalService: ShowModalService
  ) {}

  ngOnInit(): void {
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
  }

  add(showModal: boolean): void {
    if(this.cinema && this.checkCinema()){
      this.cinemaService.addCinema(this.cinema).subscribe();
      this.setShowModal(showModal);
    }
  }

  checkCinema(): boolean{
    return !!(this.cinema.name && this.cinema.address);
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
    this.cinema = {id: "", address: "", name: ""}
  }
}
