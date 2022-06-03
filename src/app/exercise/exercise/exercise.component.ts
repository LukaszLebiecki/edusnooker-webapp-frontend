import {Component, OnInit} from '@angular/core';
import {async, interval, Subscription} from "rxjs";

@Component({
  selector: '[app-exercise]',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  private subscription: Subscription;
  public clicked: boolean = false;
  public TIME_LIMIT: number = 5;
  private timePassed: number = 0;
  private timeLeft: number = this.TIME_LIMIT;
  timeEnd: boolean = false;


  constructor() {
  }

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

  startTimer(): void {
    this.subscription = interval(1000).subscribe(x => {

        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;

        if (this.timeLeft < 0) {
          this.timeEnd = true;
          this.subscription.unsubscribe();

        } else {
          document.getElementById("base-timer-label").innerHTML = this.formatTime(this.timeLeft);
        }
      }
    );
  }

  refresh(): void {
    this.subscription.unsubscribe();
    this.clicked = false;
    this.TIME_LIMIT = 5;
    this.timePassed = 0;
    this.timeLeft = this.TIME_LIMIT;
    this.timeEnd = false;
    document.getElementById("base-timer-label").innerHTML = this.formatTime(this.timeLeft);
  }

}
