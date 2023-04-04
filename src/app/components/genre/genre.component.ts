import {Component, Input} from '@angular/core';
import {Genre} from "../../models/genre";
import {GenreService} from "../../service/http/genre.service";
import {ActorService} from "../../service/http/actor.service";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent {
  @Input() genre: Genre = {id: "", name: ""}

  isEdit: boolean = false;

  constructor(
    private genreService: GenreService
  ) {}

  ngOnInit(){
    if(!(this.genre.id && this.genre.name)){
      this.isEdit = true;
    }
  }

  onEdit(){
    this.isEdit = true;
  }
  delGenre(){
    this.genreService.deleteGenre(this.genre.id).subscribe();
  }
  updateGenre(){
    if(this.genre.name){
      this.genreService.updateGenre(this.genre).subscribe();
      this.isEdit = false;
    }
  }
}
