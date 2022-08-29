import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../user/models/exercise";
import {ProgressUser} from "../../progress/models/progress-user";
import {User} from "../../user/models/user";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SubSink} from "subsink";
import {interval, Subscription} from "rxjs";
import {ProgressExercise} from "../../progress/models/progress-exercise";
import {ExerciseService} from "../exercise.service";
import {ProgressSharedService} from "../../progress/progress-shared.service";
import {UserService} from "../../shared-module/services/user.service";
import {NotificationService} from "../../notification/notification.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {NotificationType} from "../../notification/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ProgressService} from "../../progress/progress.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  public selectedExercise: Exercise = new Exercise;
  public exerciseSlotOne: Exercise = new Exercise;
  public exerciseSlotTwo: Exercise = new Exercise;
  public exerciseSlotThree: Exercise = new Exercise;
  public levelSlotOne: number;
  public levelSlotTwo: number;
  public levelSlotThree: number;
  public progressUser: ProgressUser;
  public user: User;
  public resultNumberOfPoint: number = 0;
  public currentAttempt: number = 0;
  public currentStrokes: number = 1;
  public endAttempt: boolean = false;
  public endExercises: boolean = false;
  public timeEnd: boolean = false;
  public clicked: boolean = false;
  public clickStart: boolean = false;
  public TIME_LIMIT: number = 3;
  public blockedButtonStart: boolean = false;
  public blockedButtonPause = false;
  public videoUrl: SafeResourceUrl = "";
  public viewBonus: boolean = false;
  private subs = new SubSink();
  private dangerousVideoUrl: string = "";
  private subscription: Subscription;
  private timePassed: number = 0;
  private timeLeft: number = this.TIME_LIMIT;
  private WARNING_THRESHOLD: number = 10;
  private ALERT_THRESHOLD: number = 5;
  private FULL_DASH_ARRAY: number = 283;
  private audio: any = new Audio();

  public progressMap: Map<string, ProgressExercise> = new Map<string, ProgressExercise>();

  constructor(private exerciseService: ExerciseService,
              private progressSharedService: ProgressSharedService,
              private sanitizer: DomSanitizer,
              private userServiceShow: UserService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private progressService: ProgressService) {
  }

  ngOnInit(): void {
    this.loadTestExercise()
    this.progressSharedService.progressExerciseMap$.subscribe((progress) => this.progressMap = progress);
    this.user = this.authenticationService.getUserFromLocalCache();
    this.userServiceShow.userCurrent$.subscribe((user) => {
      this.user = user
    });
  }

  //test
  public loadTestExercise() {
    this.exerciseService.getExerciseList(0).subscribe(e => {
      this.exerciseSlotOne = e[0];
      this.levelSlotOne = this.changeLevelToNumber(this.exerciseSlotOne.level)
    })
    this.exerciseService.getExerciseList(1).subscribe(e => {
      this.exerciseSlotTwo = e[0];
      this.levelSlotTwo = this.changeLevelToNumber(this.exerciseSlotTwo.level)
    })
    this.exerciseService.getExerciseList(2).subscribe(e => {
      this.exerciseSlotThree = e[0]
    this.levelSlotThree = this.changeLevelToNumber(this.exerciseSlotThree.level)
    })
  }


  public onAddProgressUser(progressUser: ProgressUser): void {
    const formData = this.exerciseService.createProgressUserFormDate(progressUser)
    this.subs.add(
      this.exerciseService.addProgressUser(formData).subscribe(
        (response: ProgressUser) => {
          this.reload();
          this.sendNotification(NotificationType.SUCCESS, `Save your progress`)
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: any): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred, Please try again.');
    }
  }

  private checkEndExercises(): boolean {
    return this.currentAttempt >= this.selectedExercise.numberOfAttempts;
  }

  private checkEndAttempt(): boolean {
    return this.currentStrokes >= this.selectedExercise.numberOfStrokesInOneAttempt;
  }

  private logicAttempt() {
    if (this.checkEndAttempt()) {
      this.currentAttempt += 1;
      this.currentStrokes = 1;
    } else {
      this.currentStrokes += 1;

    }
  }

  private logicAttemptMiss() {
    this.currentAttempt += 1;
    this.currentStrokes = 1;
  }

  private changeLevelToNumber(level: string): number {
    switch (level) {
      case "WHITE": {
        return 0;
      }
      case "RED": {
        return 1;
      }
      case "YELLOW": {
        return 2;
      }
      case "GREEN": {
        return 3;
      }
      case "BROWN": {
        return 4;
      }
      case "BLUE": {
        return 5;
      }
      case "PINK": {
        return 6;
      }
      case "BLACK": {
        return 7;
      }
    }
    return 0;
  }

  progressStart(): ProgressUser {
    this.progressUser = new ProgressUser();
    this.progressUser.idExercise = this.selectedExercise.exerciseId;
    this.progressUser.numberLevel = this.changeLevelToNumber(this.selectedExercise.level);
    this.progressUser.numberOfPointsToPassed = this.selectedExercise.numberOfPointsToPassed;
    this.progressUser.resultNumberOfPoint = this.resultNumberOfPoint;
    this.progressUser.dateTimeExercise = Date.now();
    this.progressUser.userId = this.user.userId;
    return this.progressUser;
  }

  hideBonus() {
    this.viewBonus = false;
  }

  bonusYes() {
    this.resultNumberOfPoint += this.selectedExercise.bonusNumberOfPoints;
    this.hideBonus();
  }

  bonusNo() {
    this.hideBonus();
  }

  showBonus() {
    this.viewBonus = true;
  }

  bonusLogic() {
    if (this.selectedExercise.bonusPoint) {
      this.showBonus();
    }
  }

  clickPointPass() {
    this.resultNumberOfPoint += 1;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  clickPointMiss() {
    this.logicAttemptMiss();
    this.endExercises = this.checkEndExercises();
  }

  clickPointRed() {
    this.resultNumberOfPoint += 1;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  clickPointYellow() {
    this.resultNumberOfPoint += 2;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  clickPointGreen() {
    this.resultNumberOfPoint += 3;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  clickPointBrown() {
    this.resultNumberOfPoint += 4;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  clickPointBlue() {
    this.resultNumberOfPoint += 5;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  clickPointPink() {
    this.resultNumberOfPoint += 6;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  clickPointBlack() {
    this.resultNumberOfPoint += 7;
    this.logicAttempt();
    this.endExercises = this.checkEndExercises();
    this.bonusLogic();
  }

  updateVideoUrl(id: string) {
    this.dangerousVideoUrl = 'https://player.vimeo.com/video/' + id;
    this.videoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }


  public onSelectExercise(selectedExercise: Exercise): void {
    this.selectedExercise = selectedExercise;
    this.updateVideoUrl(selectedExercise.videoUrl);
  }

  reload() {
    window.location.reload();
  }

  refresh(): void {
    const {alert, warning, info} = this.COLOR_CODES;
    this.subscription.unsubscribe();
    this.clicked = false;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.timeEnd = false;
    this.clickStart = false;
    this.blockedButtonStart = false;
    this.blockedButtonPause = false;
    document.getElementById("base-timer-label").innerHTML = this.formatTime(this.timeLeft);
    document.getElementById("base-timer-path-remaining").classList.remove(info.color);
    document.getElementById("base-timer-path-remaining").classList.remove(warning.color);
    document.getElementById("base-timer-path-remaining").classList.remove(alert.color);
    document.getElementById("base-timer-path-remaining").classList.add(info.color);
    this.setCircleDasharray();
    this.setRemainingPathColor(this.timeLeft);
  }

  COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: this.WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: this.ALERT_THRESHOLD
    }
  };
  remainingPathColor = this.COLOR_CODES.info.color;


  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds: any = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  playAudioStart() {
    this.audio.src = "../../../assets/sound/StartTimer.mp3";
    this.audio.load();
    this.audio.play();
  }

  playAudioStop() {
    this.audio.src = "../../../assets/sound/StopTimer.mp3";
    this.audio.load();
    this.audio.play();
  }

  startTimer(): void {
    this.blockedButtonStart = true;
    this.playAudioStart();
    this.subscription = interval(1000).subscribe(x => {

        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;

        if (this.timeLeft < 6 && this.timeLeft > 0) {
          this.playAudioStart();
        }

        if (this.timeLeft == 0) {
          this.playAudioStop();
        }

        if (this.timeLeft < 0) {
          this.blockedButtonPause = true;
          this.timeEnd = true;
          this.subscription.unsubscribe();
        } else {
          this.clickStart = true;
          document.getElementById("base-timer-label").innerHTML = this.formatTime(this.timeLeft);
          this.setCircleDasharray();
          this.setRemainingPathColor(this.timeLeft);
        }
      }
    );
  }

  pauseTimer() {
    this.blockedButtonStart = false;
    this.clickStart = false;
    this.subscription.unsubscribe();
    this.clicked = false;
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
    return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    const circleDasharray = `${(
      this.calculateTimeFraction() * this.FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }

  setRemainingPathColor(timeLeft) {
    const {alert, warning, info} = this.COLOR_CODES;

    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);

    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
}
