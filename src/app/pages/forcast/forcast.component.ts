import { Order } from './../../models/Order';
import { ForecastDialogComponent } from './../../dialogs/forecast-dialog/forecast-dialog.component';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { EditOrderDialogComponent } from 'src/app/dialogs/edit-order-dialog/edit-order-dialog.component';
import { ForecastService } from 'src/app/services/ForecastService';
import { DomSanitizer } from '@angular/platform-browser';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#006400',
    secondary: '#006400'
  }
};

@Component({
  selector: 'app-forcast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['forcast.component.scss'],
  templateUrl: 'forcast.component.html'
})
export class ForcastComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CustomCalendarEvent[];

  activeDayIsOpen: boolean = true;
  forecasts : Order[];
  progress;
  constructor(
    public dialog: MatDialog,
    private forecastService: ForecastService,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
    ) {
      iconRegistry.addSvgIcon(
        'info',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icon/info.svg'));
    }

  ngOnInit() {
    this.events = [];
    this.getForecastdata();
  }
  getForecastdata(){
    this.progress = true;
    this.forecastService.getForecast().subscribe(result => {
      this.forecasts = result;
      this.populateCalender();
      this.viewDate = new Date();
      this.progress = false;
    }, error => {
      this.progress = false;
      console.log(error);
    })

  }

  populateCalender(){
    this.forecasts.forEach((order)=>{
      this.addEvent(order.proposalNo, new Date(order.dueDate),order.forecast?colors.green:colors.red, order);
    })
    this.refresh.next();
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CustomCalendarEvent): void {
    console.log(event);
    const dialogRef = this.dialog.open(ForecastDialogComponent, {
      width: '600px',
      data: event.data
    });
  }
  handleListItem(data: Order): void {
    console.log(event);
    const dialogRef = this.dialog.open(ForecastDialogComponent, {
      width: '600px',
      data: data
    });
  }

  addEvent(title: string, start: Date, color: any, data: Order): void {
    this.events = [
      ...this.events,
      {
        title: title,
        start: start,
        color: color,
        data: data
      }
    ];

  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

export interface CustomCalendarEvent extends CalendarEvent {
  data?: Order;
}
