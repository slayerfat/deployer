import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogService } from '../shared/services/log/log.service';
import { LogInterface } from '../shared/interfaces/models/LogInterface';
import { HumanDiff } from '../shared/pipes/human-diff.pipe';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import { Subscription } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css'],
  directives: [CHART_DIRECTIVES],
  providers: [LogService],
  pipes: [HumanDiff]
})
export class DashboardComponent implements OnInit, OnDestroy {

  /**
   * The logs to be shown with basic info.
   *
   * @type {LogInterface[]}
   */
  public logs: LogInterface[];

  /**
   * The logs to be used by the charts.
   *
   * @type {LogInterface[]}
   */
  public logsChart: LogInterface[];

  /**
   * The default amount of the charts.
   *
   * @type {number}
   */
  public chartAmount = 25;

  /**
   * Data of the select in the view.
   *
   * @type {Object[]}
   */
  public chartAmountSelect = [
    {value: 5, label: 'Last 5'},
    {value: 10, label: 'Last 10'},
    {value: 25, label: 'Last 25', selected: true},
    {value: 50, label: 'Last 50'},
    {value: 100, label: 'Last 100'},
  ];

  /**
   * The charts labels.
   *
   * @type {string|string[]}
   */
  public pieChartLabels: string[] = ['Errors', 'Successes'];

  /**
   * The initial chart data.
   *
   * @type {number[]}
   */
  public pieChartData: number[] = [0, 0];

  /**
   * The logs subscription.
   *
   * @type {Subscription}
   */
  private logsSub: Subscription;

  /**
   * The logs subscription associated to the charts
   *
   * @type {Subscription}
   */
  private logSubCharts: Subscription;

  constructor(private logsService: LogService) {
  }

  public ngOnInit(): void {
    this.logsSub = this.logsService.getLatest().subscribe((logs: LogInterface[]) => {
      this.logs = logs;
    });

    this.logSubCharts = this.logsService.getLatest(this.chartAmount).subscribe((logs: LogInterface[]) => {
      this.logsChart = logs;
      const errors = logs.filter(function (log) {
        return log.status === false;
      });
      this.pieChartData = [errors.length, Math.abs(logs.length - errors.length)];
    });
  }

  public ngOnDestroy(): void {
    this.logsSub.unsubscribe();
    this.logSubCharts.unsubscribe();
  }

  /**
   * Sets the css classes of the logs icons.
   *
   * @param {boolean} status
   * @returns {Object}
   */
  public setStatusClasses(status: boolean) {
    return {
      'fa-times-circle-o': !status,
      'text-danger': !status,
      'fa-check-circle-o': status,
      'text-success': status,
    };
  }

  /**
   * When the select change on the view we have to change the amount to show.
   *
   * @param {Object} event
   */
  public chartSelectChange(event: {target: {value}}): void {
    const amount = parseInt(event.target.value, 10);
    if (this.chartAmount >= amount) {
      return this.makeLogData(this.logsChart.slice(0, amount));
    }

    this.logSubCharts.unsubscribe();
    this.chartAmount = amount;
    this.logSubCharts = this.logsService.getLatest(this.chartAmount).subscribe((logs: LogInterface[]) => {
      this.logsChart = logs;
      this.makeLogData(logs);
    });
  }

  private makeLogData(logs: LogInterface[]): void {
    const errors = logs.filter(function (log) {
      return log.status === false;
    });
    this.pieChartData = [errors.length, Math.abs(logs.length - errors.length)];
  }
}
