import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartData, ChartEvent, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";
import {User} from "../user/models/user";
import {AuthenticationService} from "../auth/authentication.service";
import {UserService} from "../shared-module/services/user.service";
import {StatisticsService} from "./statistics.service";
import {ProgressStatistics} from "../progress/models/progress-statistics";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective | undefined;

  public user: User;
  public barChartType: ChartType = 'bar';
  public progressStatistics: ProgressStatistics = new ProgressStatistics();
  public currentMonth: number;
  public month: number;
  public currentYear: number;
  public year: number;
  public stringMonth: string;
  public allYearStatistics: number[] = [];
  public dataLoadForm: FormGroup;
  private progressCharts11: number[] = [];
  private progressCharts12: number[] = [];
  private progressCharts13: number[] = [];
  private progressCharts21: number[] = [];
  private progressCharts22: number[] = [];
  private progressCharts23: number[] = [];
  private progressCharts41: number[] = [];
  private progressCharts42: number[] = [];
  private progressCharts43: number[] = [];
  public load: boolean = true;
  public show: boolean = true;

  constructor(private statisticsService: StatisticsService,
              private authenticationService: AuthenticationService,
              private userServiceShow: UserService,
              private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.userServiceShow.userCurrent$.subscribe((user) => {
      this.user = user
    });
    this.loadYears();
    this.loadData();
    this.loadStatistics();
    this.dataLoadForm = this.buildDateLoadStatistic();
  }

  buildDateLoadStatistic() {
    return this.formBuilder.group({
      year: this.currentYear,
      month: this.currentMonth,
    });
  }

  loadDateStatistic(): void {
    this.year = this.dataLoadForm?.value.year;
    this.month = +this.dataLoadForm?.value.month;
    this.changeNumberToStringMonth(this.month);

    this.loadStatistics();

    this.show = false;
    setTimeout(()=>{
      this.show = true;
    },50);

  }

  loadData() {
    let date = new Date();
    this.currentYear = date.getFullYear()
    this.currentMonth = date.getMonth() + 1;
    this.year = this.currentYear;
    this.month = this.currentMonth;
    this.changeNumberToStringMonth(this.month);
  }

  private changeNumberToStringMonth(month: number) {
    switch (month) {
      case 1:
        this.stringMonth = "January"
        break;
      case 2:
        this.stringMonth = "February"
        break;
      case 3:
        this.stringMonth = "March"
        break;
      case 4:
        this.stringMonth = "April"
        break;
      case 5:
        this.stringMonth = "May"
        break;
      case 6:
        this.stringMonth = "June"
        break;
      case 7:
        this.stringMonth = "July"
        break;
      case 8:
        this.stringMonth = "August"
        break;
      case 9:
        this.stringMonth = "September"
        break;
      case 10:
        this.stringMonth = "October"
        break;
      case 11:
        this.stringMonth = "November"
        break;
      case 12:
        this.stringMonth = "December"
        break;
    }
  }

  loadYears():void {
    this.statisticsService.getYears(this.user.userId).subscribe((y) => {
      this.allYearStatistics = y?.progressYear;
    });
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics(this.user.userId, this.month, this.year).subscribe((p) => {
      this.progressStatistics.pointsScoredToYear = p?.pointsScoredToYear;
      this.progressStatistics.exercisesPerformedToYear = p?.exercisesPerformedToYear;
      this.progressStatistics.exercisesCompletedToYear = p?.exercisesCompletedToYear;
      this.progressStatistics.pointsScoredToMonth = p?.pointsScoredToMonth;
      this.progressStatistics.exercisesPerformedToMonth = p?.exercisesPerformedToMonth;
      this.progressStatistics.exercisesCompletedToMonth = p?.exercisesCompletedToMonth;
      this.progressStatistics.pointsScoredToHour = p?.pointsScoredToHour;
      this.progressStatistics.exercisesPerformedToHour = p?.exercisesPerformedToHour;
      this.progressStatistics.exercisesCompletedToHour = p?.exercisesCompletedToHour;

      this.barChartData11.datasets[0].data = this.progressStatistics?.pointsScoredToYear;
      this.barChartData12.datasets[0].data = this.progressStatistics?.exercisesPerformedToYear;
      this.barChartData12.datasets[1].data = this.progressStatistics?.exercisesCompletedToYear;

      this.barChartData21.datasets[0].data = this.progressStatistics?.pointsScoredToMonth;
      this.barChartData22.datasets[0].data = this.progressStatistics?.exercisesPerformedToMonth;
      this.barChartData22.datasets[1].data = this.progressStatistics?.exercisesCompletedToMonth;

      this.barChartData41.datasets[0].data = this.progressStatistics?.pointsScoredToHour;
      this.barChartData42.datasets[0].data = this.progressStatistics?.exercisesPerformedToHour;
      this.barChartData42.datasets[1].data = this.progressStatistics?.exercisesCompletedToHour;

      this.chart?.chart?.update();
      this.load = false;
    });
  }

  public barChartData11: ChartData = {
    labels: ['January', 'February', 'March ', 'April ', 'May ', 'June ', 'July ', 'August ', 'September ', 'October ', 'November ', 'December '],
    datasets: [
      {
        data: this.progressCharts11,
        label: 'POINTS SCORED',
        backgroundColor: 'rgba(224, 1, 2, 0.7)',
        hoverBackgroundColor: 'rgba(240, 128, 128, 0.9)'
      }
    ]
  };

  public barChartData12: ChartData = {
    labels: ['January', 'February', 'March ', 'April ', 'May ', 'June ', 'July ', 'August ', 'September ', 'October ', 'November ', 'December '],
    datasets: [
      {
        data: this.progressCharts12,
        label: 'EXERCISES PERFORMED',
        backgroundColor: 'rgba(105, 105, 105, 0.7)',
        hoverBackgroundColor: 'rgba(169, 169, 169, 0.9)'
      },
      {
        data: this.progressCharts13,
        label: 'EXERCISES COMPLETED',
        backgroundColor: 'rgba(1, 146, 69, 0.7)',
        hoverBackgroundColor: 'rgba(144, 238, 144, 0.9)'
      }
    ]
  };

  public barChartData21: ChartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    datasets: [
      {
        data: this.progressCharts21,
        label: 'POINTS SCORED',
        backgroundColor: 'rgba(224, 1, 2, 0.7)',
        hoverBackgroundColor: 'rgba(240, 128, 128, 0.9)'
      }
    ]
  };

  public barChartData22: ChartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    datasets: [
      {
        data: this.progressCharts22,
        label: 'EXERCISES PERFORMED',
        backgroundColor: 'rgba(105, 105, 105, 0.7)',
        hoverBackgroundColor: 'rgba(169, 169, 169, 0.9)'
      },
      {
        data: this.progressCharts23,
        label: 'COMPLETED EXERCISES',
        backgroundColor: 'rgba(1, 146, 69, 0.7)',
        hoverBackgroundColor: 'rgba(144, 238, 144, 0.9)'
      }
    ]
  };

  public barChartData41: ChartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    datasets: [
      {
        data: this.progressCharts41,
        label: 'POINTS SCORED',
        backgroundColor: 'rgba(224, 1, 2, 0.7)',
        hoverBackgroundColor: 'rgba(240, 128, 128, 0.9)'
      }
    ]
  };

  public barChartData42: ChartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    datasets: [
      {
        data: this.progressCharts42,
        label: 'EXERCISES PERFORMED',
        backgroundColor: 'rgba(105, 105, 105, 0.7)',
        hoverBackgroundColor: 'rgba(169, 169, 169, 0.9)'
      },
      {
        data: this.progressCharts43,
        label: 'COMPLETED EXERCISES',
        backgroundColor: 'rgba(1, 146, 69, 0.7)',
        hoverBackgroundColor: 'rgba(144, 238, 144, 0.9)'
      }
    ]
  };

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }


  ngAfterViewInit(): void {
    this.chart?.chart.update();
  }
}
