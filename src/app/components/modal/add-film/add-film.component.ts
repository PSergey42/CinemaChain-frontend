import {Component, Input, OnInit} from '@angular/core';
import {ShowModalService} from "../../../service/show-modal.service";
import {Actor} from "../../../models/actor";
import {Genre} from "../../../models/genre";

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit{
  showModal?: boolean;
  @Input() actors?: Actor[]
  @Input() genres?: Genre[]
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
