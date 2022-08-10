import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Exercise} from "../../user/models/exercise";
import {ProgressUser} from "../../progress/models/progress-user";
import {User} from "../../user/models/user";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SubSink} from "subsink";
import {interval, Subscription} from "rxjs";
import {ProgressExercise} from "../../progress/models/progress-exercise";
import {ExerciseService} from "../../exercise/exercise.service";
import {ProgressSharedService} from "../../progress/progress-shared.service";
import {UserService} from "../../shared-module/services/user.service";
import {NotificationService} from "../../notification/notification.service";
import {AuthenticationService} from "../../auth/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {NotificationType} from "../../notification/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {HomeService} from "../home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild("animatedPointsScored") animatedPointsScored: ElementRef;
  @ViewChild("animatedExercisesPerformed") animatedExercisesPerformed: ElementRef;
  @ViewChild("animatedCompletedExercises") animatedCompletedExercises: ElementRef;

  public selectedExercise: Exercise = new Exercise;
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
  public TIME_LIMIT: number = 5;
  public blockedButtonStart: boolean = false;
  public blockedButtonPause = false;
  public videoUrl: SafeResourceUrl = "";
  public viewBonus: boolean = false;
  public lastExercise: Exercise;
  public tipsAndTrivia: string;
  public isProgress: boolean = false;
  public loaded: boolean = false;
  public pointsScored: number = 0;
  public exercisePerformed: number = 0;
  public completedExercises: number = 0;
  public duration: number;
  public steps: number;
  private subs = new SubSink();
  private dangerousVideoUrl: string = "";
  private subscription: Subscription;
  private timePassed: number = 0;
  private timeLeft: number = this.TIME_LIMIT;
  private WARNING_THRESHOLD: number = 10;
  private ALERT_THRESHOLD: number = 5;
  private FULL_DASH_ARRAY: number = 283;
  private listTipsAndTrivia: string[] = [];


  private audio: any = new Audio();
  index: number = +this.route.snapshot.params['id']
  progressMap: Map<string, ProgressExercise> = new Map<string, ProgressExercise>();


  constructor(private homeService: HomeService,
              private exerciseService: ExerciseService,
              private progressSharedService: ProgressSharedService,
              private sanitizer: DomSanitizer,
              private userServiceShow: UserService,
              private notificationService: NotificationService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute
              ) {
  }


  ngOnInit(): void {
    this.progressSharedService.progressExerciseMap$.subscribe((progress) => this.progressMap = progress);
    this.user = this.authenticationService.getUserFromLocalCache();
    this.userServiceShow.userCurrent$.subscribe((user) => {
      this.user = user
    });
    this.loadProgressCounterHome();
    this.loadLastExercise();
    this.randomTipsAndTrivia();
  }

  ngAfterViewInit() {
    this.loadProgressCounterHome();
    this.animateCount(this.pointsScored, this.animatedPointsScored);
    this.animateCount(this.exercisePerformed, this.animatedExercisesPerformed);
    this.animateCount(this.completedExercises, this.animatedCompletedExercises);
  }


  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  randomTipsAndTrivia() {
    this.listTipsAndTrivia.push("The referee is allowed to inform a colour-blind player the colour of a specific ball if he is requested to do so by the player.");
    this.listTipsAndTrivia.push("If your cue has a 9.5mm tip when you come to replacing it put on a 10mm tip and trim it down with a sharp knife. This is much easier than trying to place a tip on the cue that is the exact size.");
    this.listTipsAndTrivia.push("Joe Davis compiled the first officially recognized maximum break on Saturday 22 January 1955. The break was made at the home of Billiards and Snooker, the famous Thurston's Hall.");
    this.listTipsAndTrivia.push("The most important piece of equipment a coach should carry in his bag? Deodorant!");
    this.listTipsAndTrivia.push("In 1799 John Thurston established a business based in the Strand in London making furniture and Billiard tables.");
    this.listTipsAndTrivia.push("Exert a little more pressure through the index finger of the bridge hand. This stabilizes the bridge and helps it to remain still when playing the shot.");
    this.listTipsAndTrivia.push("The quickest century break ever made in a tournament was done so by Tony Drago in just 3 minutes and 31 seconds.");
    this.listTipsAndTrivia.push("Try to learn a little about the game of billiards and in your snooker practice also try to incorporate a few billiards shot.");
    this.listTipsAndTrivia.push("Good players need to experience as many competitions as possible in order to progress.");
    this.listTipsAndTrivia.push("Once you have found a cue you are happy and confident with please just forget it. Forget it when you are playing and let it become a part of you.");
    this.listTipsAndTrivia.push("If you want to get a rhythm into your cueing try using a metronome. Slowly but surely the background rhythm begins to penetrate your cue arm.");
    this.listTipsAndTrivia.push("If you have a competition that's important and at a venue with which you are unfamiliar,try to get there the day before.");
    this.listTipsAndTrivia.push("It may at first seem impossible and your mind may want to fight against it but practise playing with your opposite hand.");
    this.listTipsAndTrivia.push("The World Snooker Championships used to be held in a challenge format. This was changed in 1969 to the present knockout format.");
    this.listTipsAndTrivia.push("Eye on the cue bal or the object ball? Object ball and halfway through your final backswing transfer your eyes to the object ball until the shot is played");
    this.listTipsAndTrivia.push("The Crucible - a situation of severe trial, or in which different elements interact, leading to the creation of something new.");
    this.listTipsAndTrivia.push("Having aimed when standing up do not take your eyes off the point on the object ball you wish to hit until your hand touches the cloth.");
    this.listTipsAndTrivia.push("Be gentle and use the minimum pace necessary for the shot and you will be surprised at how your game will improve!");
    this.listTipsAndTrivia.push("After you have played your stroke stay down and gain valuable knowledge about the shot you have played. Ask yourself if you stayed still on the shot and if your tip went where you wanted it to");
    this.listTipsAndTrivia.push("If you have a hard physical job and you have had a busy day avoid playing snooker. Potting balls in the same way as you would normally is impossible after very hard physical exertion.");
    this.listTipsAndTrivia.push("The original balls for snooker were made of wood and then ivory. Thankfully this has changed with the most popular balls being Aramith, which is a synthetic compound.");
    this.listTipsAndTrivia.push("It's not advisable to let the tip of your cue overhang, because when applying side to a ball you don't get the backing of the ferrule to ensure a solid shot.");
    this.listTipsAndTrivia.push("Don't become a constant good loser - yes, losing is part of life and learning but being satisfied with losing means you will not work as hard as you need to in order to start winning.");
    this.listTipsAndTrivia.push("A fast cloth is a delight for a good player but slow cloth makes for heavy going and harder for break-building.");
    this.listTipsAndTrivia.push("You may be sublimely talented with a cue action like a Rolls-Royce, but without practice, practice and more practice you will soon be a jerky shadow of your former self.");
    this.listTipsAndTrivia.push("There are 5 sections of slate in the bed of a full-size table and on the old tables these can weigh over a tonne.");


    this.tipsAndTrivia = this.listTipsAndTrivia[this.getRandomInt(this.listTipsAndTrivia.length)];
    // this.tipsAndTrivia = this.listTipsAndTrivia[(this.listTipsAndTrivia.length-1)]; // do sprawdzenia czy się dobrze wyświetla
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

  loadLastExercise() {
    this.homeService.getLastExercise(this.user.userId).subscribe((e) => {
      this.lastExercise = e;
      if (e.exerciseId !== "empty") {
        this.isProgress = true;
      } else {
        this.isProgress = false;
        e.name = "no exercise performed";
        e.img = "e000.png";
      }
    });
  }

  loadProgressCounterHome() {
    this.homeService.getCounterHome(this.user.userId).subscribe((p) => {
      this.pointsScored = p?.pointScored;
      this.exercisePerformed = p?.exercisePerformed;
      this.completedExercises = p?.completedExercises;
    });
  }

  public onSelectExercise(): void {
    this.selectedExercise = this.lastExercise;
    this.updateVideoUrl(this.lastExercise.videoUrl);
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

  animateCount(digit: number, animated: ElementRef) {
    if (!this.duration) {
      this.duration = 1000;
    }

    if (typeof digit === "number") {
      this.counterFunc(digit, this.duration, animated);
    }
  }

  counterFunc(endValue, durationMs, element) {
    if (!this.steps) {
      this.steps = 12;
    }

    const stepCount = Math.abs(durationMs / this.steps);
    const valueIncrement = (endValue - 0) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = 0;
    let currentSinValue = 0;

    function step() {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));

      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      }
    }

    step();
  }
}
