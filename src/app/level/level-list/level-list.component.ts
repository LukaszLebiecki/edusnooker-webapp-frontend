import {Component, OnInit} from '@angular/core';
import {Level} from "../models/level";
import {LevelService} from "../level.service";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent implements OnInit {

  levelsInfo: Level[] = [];

  constructor(private levelService: LevelService) {
  }

  ngOnInit(): void {
    this.loadLevel();

  }

  loadLevel() {
      this.levelService.getLevels().subscribe((levels:Level[]) => this.levelsInfo = levels);

  }
}
