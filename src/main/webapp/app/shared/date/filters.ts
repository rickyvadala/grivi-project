import Vue from 'vue';
import { format, parseISO } from 'date-fns';

export const MONTHS = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';

export const DATE_TIME_LONG_FORMAT = "yyyy-MM-dd'T'HH:mm";
export const INSTANT_FORMAT = "yyyy-MM-dd'T'HH:mm:ssZ";
export const ZONED_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXXXX";

export function initFilters() {
  Vue.filter('formatDate', value => {
    debugger;
    if (value) {
      return format(parseISO(value), DATE_TIME_FORMAT);
    }
    return '';
  });
  Vue.filter('formatMillis', value => {
    if (value) {
      return format(new Date(value), DATE_TIME_FORMAT);
    }
    return '';
  });
  /* TODO Check why formatDate is not working */
  Vue.filter('formatDate2', v => {
    if (v) {
      return `${v.getDate()} ${MONTHS[v.getMonth()]} ${v.getFullYear()}`;
    }
    return '';
  });
}
