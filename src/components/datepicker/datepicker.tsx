import { Component, h, Prop, State, Watch } from '@stencil/core';
import { getFirstDayOfMonth, getNumberOfDaysInMonth, toTitleCase } from '../../utils/utils';
import { MdiIcon } from "../../utils/functional-components";
import { mdiChevronRight, mdiChevronLeft, mdiChevronDown } from "@mdi/js";

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

  /**
   * The current view of the datepicker
   */
  @Prop() view: 'date' | 'month' | 'year' = 'date';

  /**
   * The current dates array
   */
  @State() _dateNodes = []

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

  @Watch('date') checkDate() {
    this._dateNodes = this._generateDateViewNodes();
  }

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
      // const lengthOfDay = (i + 1).toString().length
      dateNodes.push(<datepicker-button class="date-buttons" selectable compact>
        {i + 1}
      </datepicker-button>)
    }

    // Populate empty date nodes
    for (let i = 0; i < firstDayOfMonth; i++) {
      blankNodes.push(<div class="empty-date">{''}</div>);
    }

    // Final date node list
    const dateNodeList = [...blankNodes, ...dateNodes];

    return dateNodeList
  }

  componentWillLoad() {
    this._dateNodes = this._generateDateViewNodes()
  }

  render() {

    return (
      <div id="datepicker-box">
        <div id="header">
          <div class="date-view-controls">
            <div class="month-year-view">
              <datepicker-button>
                <div>
                  {`${this._months.short[(new Date(this.date)).getMonth()]} ${(new Date(this.date)).getFullYear()}`.toUpperCase()}
                </div>
                <MdiIcon id="down-arrow" path={mdiChevronDown} />
              </datepicker-button>
            </div>
            <span class="flex"></span>
            <div class="navigation-buttons">
              <datepicker-button compact id="right-button">
                <MdiIcon fill="rgba(0, 0, 0, 0.54)" path={mdiChevronLeft} />
              </datepicker-button>
              <datepicker-button compact id="left-button">
                <MdiIcon fill="rgba(0, 0, 0, 0.54)" path={mdiChevronRight} />
              </datepicker-button>
            </div>
          </div>
          {
            (
              () => {
                if (this.view == 'date') {
                  const daysFormatted = this._days.shortest.map(day => toTitleCase(day));
                  return [
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
        <div id="divider"></div>
        <div id="main-area">
          {
            (
              () => {
                if (this.view == 'date') {
                  return this._dateNodes.map((val) => <div class="date">{val}</div>)
                }
              }
            )()
          }
        </div>
      </div>
    );
  }
}
