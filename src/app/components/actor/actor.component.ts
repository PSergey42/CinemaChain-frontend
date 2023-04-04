import {Component, Input} from '@angular/core';
import {Actor} from "../../models/actor";
import {GenreService} from "../../service/http/genre.service";
import {ActorService} from "../../service/http/actor.service";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent {
  @Input() actor: Actor = {id: "", fio: ""}

  isEdit: boolean = false;

  constructor(
    private actorService: ActorService
  ) {}

  ngOnInit(){
    if(!(this.actor.fio && this.actor.id)){
      this.isEdit = true;
    }
  }

  onEdit(){
    this.isEdit = true;
  }
  delActor(){
    this.actorService.deleteActor(this.actor.id).subscribe();
  }
  updateActor(){
    if(this.actor.fio){
      this.actorService.updateActor(this.actor).subscribe();
      this.isEdit = false;
    }
  }
}
