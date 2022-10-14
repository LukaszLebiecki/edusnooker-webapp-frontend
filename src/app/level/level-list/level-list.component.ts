import {Component, OnInit} from '@angular/core';
import {Level} from "../models/level";
import {LevelService} from "../level.service";
import {ProgressService} from "../../progress/progress.service";
import {ProgressLevel} from "../../progress/models/progress-level";
import {ProgressExercise} from "../../progress/models/progress-exercise";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../auth/authentication.service";
import {Role} from "../../role/role.enum";


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
  progressMode: boolean = true; // todo dodac logike
  user_id: string = "";
  progressBar: number[] = [];
  index: number = +this.route.snapshot.params['id']
  levelDescription: string[] = [
    "Beginner snooker players. Training sessions, thanks to which amateur players are introduced to the basics of the game of snooker. The exercises are selected so that even people who have never had contact with snooker will achieve their first successes in this great game.",
    "Snooker enthusiasts who play snooker recreationally with friends. At this level, players begin to consciously plan their next shots. They improve their pots and begin to control the white ball.",
    "A snooker player who already has good training habits. The exercises at this stage reinforce the technique and the replay of successful strokes.",
    "A trained player who knows and mastered the basic techniques of snooker. The control of white over the stronger hits, building the first breaks and building confidence at the table are the elements that training focuses on.",
    "At this level, the player is ready to participate in its first tournaments. Exercises at this level develop a tactical game (offensive and defensive).",
    "Players at this level are becoming more self-confident and safe in their game. They can plan their strokes three ahead. The exercises involve increasingly complex systems.",
    "Players achieve their first successes in tournaments. The time spent at the table is getting longer and longer. Players perfect their shots. Their technique builds confidence.",
    "The player easily builds 100+ point brakes. Exercises at this level are to ensure high form that is needed during tournaments. These are basic to advanced exercises to keep fit.",
  ]

  constructor(private levelService: LevelService,
              private progressService: ProgressService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.user_id = this.getCurrentUserId();
    if (this.isBasic()) {
      this.loadLevelProgress();
    } else {
      this.loadLevelDemo();
    }

  }

  isBasic(): boolean {
    return this.getCurrentUserRole() === Role.BASIC || this.getCurrentUserRole() === Role.ADMIN || this.getCurrentUserRole() === Role.PREMIUM;
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

  loadLevelDemo() {
    this.levelService.getLevelsDemo().subscribe((levels: Level[]) => {
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
    if (this.levelIsPass[2] == true && this.levelIsPass[1] == false) {
      this.levelIsPass[2] = false;
    }
    if (this.levelIsPass[3] == true && this.levelIsPass[2] == false && this.levelIsPass[1] == false) {
      this.levelIsPass[3] = false;
    }
    if (this.levelIsPass[4] == true && this.levelIsPass[3] == false && this.levelIsPass[2] == false
      && this.levelIsPass[1] == false) {
      this.levelIsPass[4] = false;
    }
    if (this.levelIsPass[5] == true && this.levelIsPass[4] == false && this.levelIsPass[3] == false
      && this.levelIsPass[2] == false && this.levelIsPass[1] == false) {
      this.levelIsPass[5] = false;
    }
    if (this.levelIsPass[6] == true && this.levelIsPass[5] == false && this.levelIsPass[4] == false
      && this.levelIsPass[3] == false && this.levelIsPass[2] == false && this.levelIsPass[1] == false) {
      this.levelIsPass[6] = false;
    }
    if (this.levelIsPass[7] == true && this.levelIsPass[6] == false && this.levelIsPass[5] == false
      && this.levelIsPass[4] == false && this.levelIsPass[3] == false && this.levelIsPass[2] == false
      && this.levelIsPass[1] == false) {
      this.levelIsPass[7] = false;
    }
  }

  private getCurrentUserId(): string {
    return this.authenticationService.getUserFromLocalCache().userId;
  }

  private getCurrentUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

}
