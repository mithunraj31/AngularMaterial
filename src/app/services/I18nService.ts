import { Injectable } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Injectable()
export class I18nService {

  constructor(private i18n: I18n) {}

  get(messageId: string): string {
    return this.i18n({ id: messageId, value: messageId});
  }
}
