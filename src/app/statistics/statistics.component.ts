import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartData, ChartType} from "chart.js";
import {ProgressChartsHome} from "../progress/models/progress-charts-home";
import {BaseChartDirective} from "ng2-charts";
import {User} from "../user/models/user";
import {AuthenticationService} from "../auth/authentication.service";
import {UserService} from "../shared-module/services/user.service";
import {StatisticsService} from "./statistics.service";
import {ProgressStatistics} from "../progress/models/progress-statistics";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective | undefined;

  public user: User;
  public lineChartType: ChartType = 'line';
  public barChartType: ChartType = 'bar';
  public radarChartType: ChartType = 'radar';
  public progressChartsHome: ProgressChartsHome = new ProgressChartsHome();
  public progressStatistics: ProgressStatistics = new ProgressStatistics();
  private progressCharts11: number[] = [];
  private progressCharts12: number[] = [];
  private progressCharts13: number[] = [8, 8, 8, 0, 0, 8, 8];
  private progressCharts21: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 8, 8];
  private progressCharts22: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 8, 8];
  private progressCharts23: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 0, 0, 8, 8];
  private progressCharts41: number[] = [0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 8, 8];
  private progressCharts42: number[] = [0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 8, 8];
  private progressCharts43: number[] = [0, 0, 0, 0, 0, 8, 8, 8, 0, 0, 8, 8];
  public load: boolean = true;

  constructor(private statisticsService: StatisticsService,
              private authenticationService: AuthenticationService,
              private userServiceShow: UserService
  ) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.userServiceShow.userCurrent$.subscribe((user) => {
      this.user = user
    });
    this.loadProgressChartsHome();
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics(this.user.userId, 4, 2022).subscribe((p) => {
      this.progressStatistics.pointsScoredToYear = p.pointsScoredToYear;
      this.progressStatistics.exercisesPerformedToYear = p.exercisesPerformedToYear;
      this.progressStatistics.exercisesCompletedToYear = p.exercisesCompletedToYear;
      this.progressStatistics.pointsScoredToMonth = p.pointsScoredToMonth;
      this.progressStatistics.exercisesPerformedToMonth = p.exercisesPerformedToMonth;
      this.progressStatistics.exercisesCompletedToMonth = p.exercisesCompletedToMonth;
      this.progressStatistics.pointsScoredToHour = p.pointsScoredToHour;
      this.progressStatistics.exercisesPerformedToHour = p.exercisesPerformedToHour;
      this.progressStatistics.exercisesCompletedToHour = p.exercisesCompletedToHour;

      this.barChartData11.datasets[0].data = this.progressStatistics.pointsScoredToYear;
      this.barChartData12.datasets[0].data = this.progressStatistics.exercisesPerformedToYear;
      this.barChartData12.datasets[1].data = this.progressStatistics.exercisesCompletedToYear;

      this.barChartData21.datasets[0].data = this.progressStatistics.pointsScoredToMonth;
      this.barChartData22.datasets[0].data = this.progressStatistics.exercisesPerformedToMonth;
      this.barChartData22.datasets[1].data = this.progressStatistics.exercisesCompletedToMonth;

      this.barChartData41.datasets[0].data = this.progressStatistics.pointsScoredToHour;
      this.barChartData42.datasets[0].data = this.progressStatistics.exercisesPerformedToHour;
      this.barChartData42.datasets[1].data = this.progressStatistics.exercisesCompletedToHour;

      this.chart?.update();
      this.load = false;
    });
  }

  loadProgressChartsHome(): void {
    this.statisticsService.getChartsHome(this.user.userId).subscribe((p) => {
      this.progressChartsHome.chartsHome = p.chartsHome;
      this.barChartData12.datasets[0].data = this.progressChartsHome.chartsHome
      this.chart?.update();
      this.load = false;
    });
  }

  public barChartData11: ChartData = {
    labels: ['January', 'February', 'March ', 'April ', 'May ', 'June ', 'July ', 'August ', 'September ', 'October ', 'November ', 'December '],
    datasets: [
      {
        data: this.progressCharts11,
        label: 'POINTS SCORED / year',
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
        label: 'EXERCISES PERFORMED / year',
        backgroundColor: 'rgba(105, 105, 105, 0.7)',
        hoverBackgroundColor: 'rgba(169, 169, 169, 0.9)'
      },
      {
        data: this.progressCharts13,
        label: 'EXERCISES COMPLETED / year',
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
        label: 'POINTS SCORED / month',
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
        label: 'EXERCISES PERFORMED / month',
        backgroundColor: 'rgba(105, 105, 105, 0.7)',
        hoverBackgroundColor: 'rgba(169, 169, 169, 0.9)'
      },
      {
        data: this.progressCharts23,
        label: 'COMPLETED EXERCISES / month',
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
        label: 'POINTS SCORED / hour',
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
        label: 'EXERCISES PERFORMED / hour',
        backgroundColor: 'rgba(105, 105, 105, 0.7)',
        hoverBackgroundColor: 'rgba(169, 169, 169, 0.9)'
      },
      {
        data: this.progressCharts43,
        label: 'COMPLETED EXERCISES / hour',
        backgroundColor: 'rgba(1, 146, 69, 0.7)',
        hoverBackgroundColor: 'rgba(144, 238, 144, 0.9)'
      }
    ]
  };

}
