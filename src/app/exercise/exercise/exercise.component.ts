import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";

@Component({
  selector: '[app-exercise]',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  public timeEnd: boolean = false;
  public clicked: boolean = false;
  public clickStart: boolean = false;
  public TIME_LIMIT: number = 3;
  public blockedButtonStart: boolean = false;
  public blockedButtonPause = false;
  private subscription: Subscription;
  private timePassed: number = 0;
  private timeLeft: number = this.TIME_LIMIT;
  private WARNING_THRESHOLD: number = 10;
  private ALERT_THRESHOLD: number = 5;
  private FULL_DASH_ARRAY: number = 283;
  private audio: any = new Audio();

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

  ngOnInit(): void {

  }

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
    // this.playAudioStart();
    this.subscription = interval(1000).subscribe(x => {

        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;

        if (this.timeLeft < 6 && this.timeLeft > 0) {
          // this.playAudioStart();
        }

        if (this.timeLeft == 0) {
          // this.playAudioStop();
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
