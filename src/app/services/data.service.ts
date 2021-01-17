import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';

import { Apollo, gql } from 'apollo-angular';
import { Subscriber, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ILocation {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: ICharacter[];
  created: string;
}

export interface IEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: ICharacter[];
  created: string;
  }

export interface ICharacter {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin?: ILocation;
  location?: ILocation
  image: string
  episode: IEpisode[];
  created: string;
}

interface Info {
  count: number;
  pages: number;
  next: number;
  prev: number;
}

export interface ICharacters {
  info: Info;
  results: ICharacter[];
}

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];

  get paramsDetail(): string{
    return `
    info{
      count
      pages
      next
      prev
    },
    results{
      id
      name
      status
      species
      type
      gender
      image
      episode{
        id
        name
        air_date
        episode
      }
    }
    `;
  }

  get paramAll(): string{
    return `
      info{
        count
        pages
        next
        prev
      },
      results{
        id
        name
        status
        image
        location{
          name
      }
    }`
  }


  constructor(
    private apollo: Apollo
  ) { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }


  getCharacters( page:number ) {
    const AllArticlesQuery = gql`query {
      characters( page: ${ page } ){
        ${ this.paramAll }
      }
    }`;
    return this.apollo.query<any>({ query: AllArticlesQuery });
  }

  getCharacterByID( id ){
    const getById = gql`
      query {
        character( id: ${id} ){
          id
          name
          status
          species
          type
          gender
          origin{
            name
          }
          image
          episode{
            id
            name
            air_date
            episode
            created
          }
          image
          location{
            name
          }
        }
      }
    `;
    return this.apollo.query<any>({ query: getById });
  }

}
