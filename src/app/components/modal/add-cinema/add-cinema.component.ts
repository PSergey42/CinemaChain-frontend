import {Component, Input, OnInit} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent implements OnInit{
  showModal?: boolean;
  constructor(
    private readonly showModalService: ShowModalService
  ) {}

  ngOnInit(): void {
    this.showModalService.showModal$.subscribe((showModal) => this.showModal = showModal);
  }

  public setShowModal(showModal: boolean): void {
    this.showModalService.setShowModal(showModal);
  }
}
