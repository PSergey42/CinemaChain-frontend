import {Component, Input} from '@angular/core';
import {Genre} from "../../models/genre";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {
  @Input() genre: Genre = {id: "", name: ""}

  isEdit: boolean = false;

  ngOnInit(){
    if(!(this.genre.id && this.genre.name)){
      this.isEdit = true;
    }
  }

  onEdit(){
    this.isEdit = true;
  }
  delGenre(){

  }
  updateGenre(){
    if(this.genre.name){
      this.isEdit = false;
    }
  }
}
