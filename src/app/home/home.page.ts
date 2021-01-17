import { Component, OnInit } from '@angular/core';
import { DataService, ICharacter, ICharacters, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  page: number;
  next: boolean;
  total: number;
  characteres: ICharacter[] = [];

  constructor(private data: DataService) {
    this.page = 1;
  }

  ngOninit(){
  }

  ngOnInit() {
    this.initApp();
  }

  initApp(){

    this.data.getCharacters(1).subscribe( ({data}) => {
      // 1console.log(data);
      const xdata: ICharacters = data.characters;
      // console.log(xdata);
      if( xdata.results ){
        this.page = xdata.info.next;
        this.characteres = xdata.results;
      }
      // console.log( this.characteres );
    });
  }

  refresh(ev) {
    setTimeout(() => {
      this.initApp();
      ev.detail.complete();
    }, 3000);
  }

  loadData( event ){
    console.log("load data");
    this.data.getCharacters(this.page).subscribe( ({data}) => {
      // 1console.log(data);
      event.target.complete();
      const xdata: ICharacters = data.characters;
      console.log(xdata.info.pages);
      if( xdata.results && xdata.results.length > 0){
        this.page = xdata.info.next;
        this.characteres = [...this.characteres, ...xdata.results];
      }

      if ( xdata.info.pages === this.page ) {
       event.target.disabled = true;
      }

    });

    

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      
  }

}
