import {Component, OnInit} from '@angular/core';
import {Level} from "../models/level";
import {LevelService} from "../level.service";
import {ProgressService} from "../../progress/progress.service";
import {ProgressLevel} from "../../progress/models/progress-level";
import {ProgressExercise} from "../../progress/models/progress-exercise";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent implements OnInit {

  levelsInfo: Level[] = [];
  progressLevel: ProgressLevel[] = [];
  progressExercise: ProgressExercise[] = [];
  levelIsPass: boolean[] = [];
  user_id: number = 1;
  progressBar: number[] = [];
  index: number = +this.route.snapshot.params['id']


  constructor(private levelService: LevelService,
              private progressService: ProgressService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadLevelProgress();
  }


  loadLevelProgress() {
    this.levelService.getLevels().subscribe((levels: Level[]) => {
      this.levelsInfo = levels;
      this.loadProgressLevel();
      this.loadLevelIsPass();
    });
    this.progressService.getProgressLevelListByUser(this.user_id).subscribe((p) => {
      this.progressLevel = p;
      this.loadProgressLevel();
      this.loadLevelIsPass();
    });

  }

  loadProgressLevel(): void {
    for (let i = 0; i < 8; i++) {
      let progressLevel: number = (this.progressLevel[i].numberOfCompletedExercises * 100) / this.levelsInfo[i].numberOfExercise;
      this.progressBar.push(progressLevel);
    }
  }

  loadLevelIsPass(): void {
    for (let i = 0; i < 8; i++) {
      let levelIsPass: boolean = (this.levelsInfo[i].numberOfPointToTarget <= this.progressLevel[i].numberOfCompletedExercises);
      this.levelIsPass.push(levelIsPass);

    }
  }


}
