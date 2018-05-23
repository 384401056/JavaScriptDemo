import { Component } from '@angular/core';

/**
 * Generated class for the SigleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sigle',
  templateUrl: 'sigle.html'
})
export class SigleComponent {

  text: string;

  constructor() {
    console.log('Hello SigleComponent Component');
    this.text = 'This is a Single';
  }
}
