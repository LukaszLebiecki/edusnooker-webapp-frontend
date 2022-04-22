import {Component, OnInit} from '@angular/core';
import {Level} from "../models/level";
import {LevelService} from "../level.service";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.less']
})
export class LevelListComponent implements OnInit {

  levelsInfo: Level[] = [];

  constructor(private levelService: LevelService) {
  }

  ngOnInit(): void {
    this.loadLevel();

  }

  loadLevel() {
    for (let i = 0; i < 8; i++) {
      this.levelService.getLevels(i).subscribe((l:Level) => this.levelsInfo.push(l));
    }


  }
}
