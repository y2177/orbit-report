import { Component } from '@angular/core';
import { Satellite } from './satellite'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  
  constructor() {
      this.sourceList = [];
      this.displayList = [];
      let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
   
      window.fetch(satellitesUrl).then(function(response) {
         response.json().then(function(data) {
   
            let fetchedSatellites = data.satellites;
              for (const i in fetchedSatellites){
                let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
                this.sourceList.push(satellite); 
              }
              this.displayList = this.sourceList.slice(0);
        }.bind(this));
      }.bind(this));
     }

     search(searchTerm: string): void {
      let matchingSatellites: Satellite[] = [];
      searchTerm = searchTerm.toLowerCase();
      for(let j=0; j < this.sourceList.length; j++) {
         let name = this.sourceList[j].name.toLowerCase();
         if (name.indexOf(searchTerm) >= 0) {
            matchingSatellites.push(this.sourceList[j]);
         }
      
      // assign this.displayList to be the array of matching satellites
      // this will cause Angular to re-make the table, but now only containing matches
      this.displayList = matchingSatellites;
    }
  }
}
