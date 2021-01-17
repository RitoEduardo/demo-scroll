import { Component, Input, OnInit } from '@angular/core';
import { ICharacter } from '../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  @Input() character: ICharacter;

  constructor() { }

  ngOnInit() {
    // console.log(this.character);
  }

}
