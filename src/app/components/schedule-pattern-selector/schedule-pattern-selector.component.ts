import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/AuthService';
import { SchedulePattern } from 'src/app/models/SchedulePattern';
import { I18nService } from 'src/app/services/I18nService';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-schedule-pattern-selector',
  templateUrl: './schedule-pattern-selector.component.html',
  styleUrls: ['./schedule-pattern-selector.component.scss']
})
export class ShedulePatternSelectorComponent implements OnInit {

  selectedPatternId: number;

  patterns: SchedulePattern[];

  @Output() onChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private productService: ProductService,
    private i18nService: I18nService,
    private authService: AuthService) { }

  ngOnInit() {
    this.selectedPatternId = this.productService.getSchedulePatternIdFromLocalStorage();
    this.productService.getSchedulePatterns().subscribe((scheculePatterns: SchedulePattern[]) => {
      this.patterns = scheculePatterns;
      this.patterns.unshift(<SchedulePattern> {
        schedulePatternId: 0,
        schedulePatternName: this.i18nService.get('default')
      });
    });
  }

  isUserOwnSelectedPattern() {
    const userId = this.authService.getUserId();
    if (this.patterns && this.patterns.length > 0 && this.selectedPatternId > 0) {
      const selectedPattern = this.patterns.filter(x => x.schedulePatternId == this.selectedPatternId)[0];
      if (selectedPattern) {
        return userId == selectedPattern.createdUser.userId;
      }
    }

    return false;
  }

  onSchedulePatternChanged() {
    this.productService.setSchedulePatternToLocalStorage(this.selectedPatternId);
    this.onChanged.emit(this.selectedPatternId);
  }
}
