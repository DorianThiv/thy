import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-thy-layout',
  templateUrl: './thy-layout.component.html',
  styleUrls: [
    '../../thy-styles/thy-theme-blue.scss',
    './thy-layout.component.scss'
  ]
})
export class ThyLayoutComponent {

  @ViewChild('container') container: ElementRef;

}
