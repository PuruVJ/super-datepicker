import { Component, Prop, h, Host, /* State */ } from '@stencil/core';
import { getFirstDayOfMonth, getNumberOfDaysInMonth, print, toTitleCase } from '../../utils/utils';

@Component({
  tag: 'super-datepicker',
  styleUrl: 'datepicker.scss',
  shadow: true
})
export class MyComponent {
  /**
   * Selected date
   * Note: Shouldn't be used with `range`. If both `range` and `date` are set, `range` will be prioritized.
   */
  @Prop({
    reflect: true,
    mutable: true
  }) date: string | Date | number = new Date();

  @Prop() view: 'date' | 'month' | 'year' = 'date';

  /**
   * The present date
   */
  _today = new Date();

  /**
   * Months object
   */
  _months = {
    long: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    short: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]
  };

  /**
   * Days object
   */
  _days = {
    shortest: [
      's',
      'm',
      't',
      'w',
      'th',
      'f',
      's'
    ],
    short: [
      'sun',
      'mon',
      'tue',
      'wed',
      'thu',
      'fri',
      'sat'
    ],
    long: [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ]
  }

  /*  @Watch('date') checkDate(newDate: string | Date | number, oldDate: string | Date | number) {
 
   } */

  _generateDateViewNodes() {
    const currentDate = new Date(this.date);

    // This is when the `1` should be shown
    const firstDayOfMonth = getFirstDayOfMonth(currentDate, this._months);

    // Number of days in the month
    const numDaysInMonth = getNumberOfDaysInMonth(currentDate);

    // The number of blank nodes to push the 1st 
    const blankNodes = [];

    // Date nodes
    const dateNodes = [];

    // Populate date nodes
    for (let i = 0; i < numDaysInMonth; i++) {
      dateNodes.push(i + 1)
    }

    // Populate empty date nodes
    for (let i = 0; i < firstDayOfMonth; i++) {
      blankNodes.push(' ');
    }

    // Final date node list
    const dateNodeList = [...blankNodes, ...dateNodes];

    return dateNodeList
  }

  componentDidLoad() {
    // this._generateDateViewNodes()
  }

  render() {

    return (
      <Host>
        <div id="datepicker-box">
          <div id="header">
            {
              (
                () => {
                  if (this.view == 'date') {
                    const daysFormatted = this._days.shortest.map(day => toTitleCase(day));
                    return [
                      <div class="date-view-controls">Hello</div>,
                      <div class="day-header">
                        {
                          daysFormatted.map(day => <div>{day}</div>)
                        }
                      </div>
                    ];
                  }
                }
              )()
            }
          </div>
          <div id="main-area">
            {
              (
                () => {
                  if (this.view == 'date') {
                    return this._generateDateViewNodes().map((val) => <div class="date">{val}</div>)
                  }
                }
              )()
            }
          </div>
        </div>
      </Host >
    );
  }
}
