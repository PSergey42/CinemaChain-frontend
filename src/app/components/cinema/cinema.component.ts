import {Component, Input} from '@angular/core';
import {Cinema} from "../../models/cinema";
import {EditModalService} from "../../service/edit-modal.service";
import {ShowModalService} from "../../service/show-modal.service";
import {Schedule} from "../../models/schedule";
import {CinemaService} from "../../service/http/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {
  @Input() cinema?: Cinema;

  showModalEdit?: boolean;
  constructor(
    private cinemaService: CinemaService,
    private readonly showModalService: ShowModalService,
    private readonly editModalService: EditModalService
  ) {
    this.editModalService.editCinema.subscribe((cinema) => {
      if(cinema && this.cinema?.id == cinema?.id){
        this.cinema = cinema;
      }
    })
  }

  setShowModalEdit(showModalEdit: boolean): void{
    this.editModalService.setCinema(this.cloneCinema(this.cinema));
    this.showModalService.setShowModalEdit(showModalEdit);
  }


  private cloneCinema(cinema: Cinema | undefined): Cinema{
    let s = JSON.stringify(cinema)
    return JSON.parse(s)
  }

  delete() {
    if(this.cinema){
      this.cinemaService.deleteCinema(this.cinema.id).subscribe();
    }
  }
}
