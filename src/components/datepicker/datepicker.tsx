import { Component, Prop, h, Host, State } from '@stencil/core';

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

  @State() view: 'date' | 'month' | 'year'

  /**
   * The present date
   */
  _today = new Date()

  /**
   * Months array
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
  }

  // @Watch('date') checkDate(newDate: string | Date | number, oldDate: string | Date | number) {

  // }

  render() {
    return (
      <Host date={this.date}>
        <div id="datepicker-box">
          <div id="header"></div>
          <div id="main-area"></div>
        </div>
      </Host>
    );
  }
}
