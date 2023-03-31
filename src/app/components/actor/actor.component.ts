import {Component, Input} from '@angular/core';
import {Actor} from "../../models/actor";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent {
  @Input() actor: Actor = {id: "", fio: ""}

  isEdit: boolean = false;

  ngOnInit(){
    if(!(this.actor.fio && this.actor.id)){
      this.isEdit = true;
    }
  }

  onEdit(){
    this.isEdit = true;
  }
  delActor(){

  }
  updateActor(){
    if(this.actor.fio){
      this.isEdit = false;
    }
  }
}
