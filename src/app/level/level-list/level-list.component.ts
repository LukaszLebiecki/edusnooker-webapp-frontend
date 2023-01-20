import {Component, OnInit} from '@angular/core';
import {Level} from "../models/level";
import {LevelService} from "../level.service";
import {ProgressService} from "../../progress/progress.service";
import {ProgressLevel} from "../../progress/models/progress-level";
import {ProgressExercise} from "../../progress/models/progress-exercise";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../auth/authentication.service";
import {Role} from "../../role/role.enum";
import {UserService} from "../../shared-module/services/user.service";
import {User} from "../../user/models/user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent implements OnInit {

  levelsInfo: Level[] = [];
  progressLevel: ProgressLevel[] = [];
  levelIsPass: boolean[] = [];
  private apiUrl: string = environment.apiUrl;
  progressMode: boolean;
  user_id: string = "";
  progressBar: number[] = [];
  index: number = +this.route.snapshot.params['id']
  levelDescription: string[] = [
    "Novice snooker enthusiasts, take the first step towards mastering the game with our tailored training sessions. Designed for beginners, these exercises will provide a solid foundation and enable you to achieve early successes in snooker, even if you have no prior experience.",
    "Recreational snooker players, take your game to the next level by learning to plan your shots and improve your pots. Our training sessions will help you gain control of the white ball and elevate your game among friends.",
    "Take your snooker skills to new heights by reinforcing your technique and replicating successful strokes through our advanced training sessions, tailored for players with already established training habits.",
    "Enhance your snooker skills by mastering control of the white ball, building your first breaks, and gaining confidence at the table through our advanced training sessions, tailored for players with basic technique mastered.",
    "Elevate your tournament game by developing your tactical skills, both offensively and defensively through our advanced training sessions tailored for players ready to participate in their first tournaments.",
    "As you become more self-assured and secure in your game, our advanced training sessions will help you take your game to the next level by teaching you to plan your strokes three steps ahead and master increasingly complex systems.",
    "Elevate your tournament game by perfecting your shots, building confidence in your technique, and increasing your time at the table through our advanced training sessions tailored for players achieving their first successes in tournaments.",
    "High-performance players, further develop your skills by consistently building 100+ point breaks and maintaining peak form during tournaments through our advanced training sessions that include basic and advanced exercises to keep you fit.",
  ]

  constructor(private levelService: LevelService,
              private progressService: ProgressService,
              private authenticationService: AuthenticationService,
              private http: HttpClient,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.user_id = this.getCurrentUserId();
   this.loadProgressModeByUser(this.user_id);
    if (this.isBasic()) {
      this.loadLevelProgress();
    } else {
      this.loadLevelDemo();
    }
  }

  loadProgressModeByUser(user_id:string) {
    this.http
      .get(this.apiUrl + '/get/progressmode/' + user_id, )
      .subscribe((data: any) => {
        this.progressMode = data.progressMode;
      });
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
    if (this.levelIsPass[1] == true && this.levelIsPass[0] == false) {
      this.levelIsPass[1] = false;
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
