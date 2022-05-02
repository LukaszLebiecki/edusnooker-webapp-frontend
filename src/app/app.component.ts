import {Component, OnInit} from '@angular/core';
import {LayoutService} from "./shared-module/services/layout.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private layoutService: LayoutService) {
  }

  isSidebarVisible: boolean = false;

  ngOnInit() {
    this.layoutService.sidebarSource$.subscribe((isVisible) => {
      this.isSidebarVisible = isVisible;
    })
  }
}
