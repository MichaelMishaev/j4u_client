import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor() { }
  filterMessages = ["abc","def","asdsz"]
  ngOnInit() {
  }

  onSelect(){

  }

}
