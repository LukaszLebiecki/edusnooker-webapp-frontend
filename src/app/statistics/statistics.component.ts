import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartData} from "chart.js";
import {ProgressChartsHome} from "../progress/models/progress-charts-home";
import {BaseChartDirective} from "ng2-charts";
import {User} from "../user/models/user";
import {AuthenticationService} from "../auth/authentication.service";
import {UserService} from "../shared-module/services/user.service";
import {StatisticsService} from "./statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective | undefined;

  public progressChartsHome: ProgressChartsHome = new ProgressChartsHome();
  public progressChartsHomeTable: number[] = [6,2];
  public user: User;

  constructor(private statisticsService: StatisticsService,
              private authenticationService: AuthenticationService,
              private userServiceShow: UserService
              ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.userServiceShow.userCurrent$.subscribe((user) => {
      this.user = user
    });
    this.loadProgressChartsHome();
  }


  public barChartData: ChartData = {
    labels: [ 'January', 'February', 'March ', 'April ', 'May ', 'June ', 'July ', 'August ', 'September ', 'October ', 'November ', 'December '],
    datasets: [
      { data: this.progressChartsHomeTable,
        label: 'Number of exercises performed in a given month.',
        backgroundColor: 'rgba(38, 166, 91, 0.7)',
        hoverBackgroundColor: 'rgba(38, 166, 91, 0.9)'}
    ]
  };

  loadProgressChartsHome(): void {
    this.statisticsService.getChartsHome(this.user.userId).subscribe((p) => {
      this.progressChartsHome.chartsHome = p.chartsHome;
      this.barChartData.datasets[0].data = this.progressChartsHome.chartsHome
      this.chart?.update();
    });

  }
}
