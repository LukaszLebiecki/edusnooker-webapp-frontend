import {Component, OnInit} from '@angular/core';
import {Level} from "../models/level";
import {LevelService} from "../level.service";
import {ProgressService} from "../../progress/progress.service";
import {ProgressLevel} from "../../progress/models/progress-level";
import {ProgressExercise} from "../../progress/models/progress-exercise";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../auth/authentication.service";


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
  user_id: string = "";
  progressBar: number[] = [];
  index: number = +this.route.snapshot.params['id']
  levelDescription: string[] = [
    "Aspiring amateur players are introduced to the practice system, acquire the basics of snooker and reach their initial practice targets.",
    "Amateurs play snooker as a sport and consolidate their basic  skills.",
    "The snooker player continuously trains on the basic of the practice system, strengthens his/her technique and reproduces successful shot.",
    "The trained player is now able to apply the practice elements in a frame, using the required techniques.",
    "Players can use the skills acquired during practice in competitive environments (tournaments).",
    "Players are increasingly confident and secure in their game. Initial success at tournaments or championships.",
    "Players aim at playing in the upper leagues and reaching the semi-finals of national tournaments.",
    "Participation in national championships and the premier league is open to the player.",
  ]

  constructor(private levelService: LevelService,
              private progressService: ProgressService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.user_id = this.getCurrentUserId();
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

  private getCurrentUserId(): string {
    return this.authenticationService.getUserFromLocalCache().userId;
  }

}
