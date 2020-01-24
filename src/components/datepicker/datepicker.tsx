import { mdiChevronDown, mdiChevronLeft, mdiChevronRight, mdiChevronUp } from "@mdi/js";
import { Component, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { MdiIcon } from "../../utils/functional-components";
import { getFirstDayOfMonth, getNumberOfDaysInMonth, toTitleCase } from '../../utils/utils';

/**
 * @todo
 * first make a daterange for desktop (shift, ctrl) + click
 * Then implement long press gesture recognition for mobiles
 */

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
  }) date: Date = new Date();

  /**
   * The type of this component
   */
  @Prop() type: 'date' | 'range' = 'range';

  /**
   * The currently selected daterange
   */
  @Prop({
    mutable: true,
    reflect: true
  }) daterange: string[] = [
    new Date(2020, 0, 19).toString(),
    new Date(2020, 0, 20).toString(),
    new Date(2020, 0, 21).toString(),
    new Date(2020, 0, 22).toString(),
    new Date(2020, 0, 23).toString(),
    new Date(2020, 0, 24).toString(),
    new Date(2020, 0, 25).toString()
  ]

  /**
   * The current view of the datepicker
   */
  @Prop({
    mutable: true,
    reflect: true
  }) view: 'date' | 'month' | 'year' = 'date';

  /**
   * The number of years to be shown in a single view
   */
  @Prop() yearViewCount: number = 20;

  /**
   * Whether the calender starts from sunday or monday
   */
  @Prop() startsFromMonday: false;

  /**
   * The current dates array
   */
  @State() _dateNodes = [];

  /**
   * For `view` = year
   * Years list
   */
  @State() _years = []

  /**
   * Internally keep track of the current years and 
   */
  @State() _pseudoDate = {
    month: new Date(this.date).getMonth(),
    year: new Date(this.date).getFullYear()
  }

  /**
   * Fired when year is selected
   */
  @Event() yearSelected: EventEmitter;

  /**
   * Fired when month is selected
   */
  @Event() monthSelected: EventEmitter;

  /**
   * Fired when date(1 - 31, not the Date() object) is selected
   */
  @Event() dateSelected: EventEmitter;

  /**
   * The present date object
   */
  _today = new Date();

  /**
   * The present year
   */
  _currentYear = this._today.getFullYear()

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
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec'
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

  /**
   * The CSS grid styles for main area for each view
   */
  _gridStyles = {
    date: {
      'grid-template-columns': 'repeat(7, 1fr)'
    },
    year: {
      'grid-template-columns': 'repeat(4, 1fr)'
    },
    month: {
      'grid-template-columns': 'repeat(4, 1fr)'
    }
  }


  @Watch('date') checkDate() {
    this._dateNodes = this._generateDateViewNodes();
    this._generateYearsList()
  }

  @Watch('yearViewCount') updateYearViewCount() {
    this._years = this._generateYearsList();
    // Print(this._years);
  }

  @Watch('startsFromMonday') reCalculateCalenderLayout() {
    this._dateNodes = this._generateDateViewNodes();
  }

  /**
   * Generates all the date nodes to be populated
   */
  private _generateDateViewNodes(date: Date = new Date(this.date)) {
    const currentDate = new Date(date);

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
      dateNodes.push(<datepicker-button
        onClick={() => this._select(i + 1)}
        selected={this._whetherShouldBeSelected(i)}
        bordered={this._checkWhetherToday(i)}
        class={{
          "date-button": true
        }}
        selectable
        compact>
        {i + 1}
      </datepicker-button>)
    }

    // Determine how many empty days to push by depending on the `startsFromMonday` property
    const numDaysToPush = this.startsFromMonday ? firstDayOfMonth - 1 : firstDayOfMonth;

    // Populate empty date nodes
    for (let i = 0; i < numDaysToPush; i++) {
      blankNodes.push(<div class="empty-date">{''}</div>);
    }

    // Final date node list
    const dateNodeList = [...blankNodes, ...dateNodes];

    return dateNodeList;
  }

  private _checkWhetherToday(i: number): boolean {
    // const selectedDate = new Date(this._today);

    // Check whether the selected year is current year
    if (this._today.getFullYear() !== this._pseudoDate.year) return false;

    // Whether the current month is selected month
    if (this._today.getMonth() !== this._pseudoDate.month) return false;

    // Finally if current date is equal to selected date
    if (this._today.getDate() !== i + 1) return false;

    return true;
  }

  /**
   * Generates a list of years for the `year` view
   */
  _generateYearsList(date: string | Date = this.date): number[] {
    date = new Date(date);

    // Get the present year
    const presentYear = date.getFullYear();

    // the base integer
    const base = Math.floor(presentYear / this.yearViewCount);

    // Initial year
    const initYear = base * this.yearViewCount;

    // Final year
    const finalYear = ((base + 1) * this.yearViewCount) - 1;

    // The years array
    const years_array = [];

    for (let i = initYear; i <= finalYear; i++) {
      years_array.push(i);
    }

    return years_array;
  }

  /**
   * The onclick listener to switch the view
   */
  _switchView() {
    if (this.view === 'date') {
      this.view = 'year'
    } else if (this.view === 'year') {
      this.view = 'date'
    }
  }

  /**
   * Check whether the current date passes the filter of being selectable or not
   */
  _whetherShouldBeSelected(i: number) {
    if (this.type === 'date') {
      const selectedDate = new Date(this.date);

      // Check whether the selected year is current year
      if (selectedDate.getFullYear() !== this._pseudoDate.year) return false;

      // Whether the current month is selected month
      if (selectedDate.getMonth() !== this._pseudoDate.month) return false;

      // Finally if current date is equal to selected date
      if (selectedDate.getDate() !== i + 1) return false;

      return true;
    } else {
      return this.daterange.includes(new Date(this._pseudoDate.year, this._pseudoDate.month, i + 1).toString())
    }
  }

  /**
   * Produce next batch
   * If `view` = date, next month calender shown
   * If `view` = month, nothing happens. Button will be disabled
   * If `view` = year, next set of years will be generated
   * */
  _produceBatch(direction: 'next' | 'previous') {
    // Determine number to be added for the respective batch
    const adduct = direction === 'next' ? +1 : -1

    const baseAdder = this._pseudoDate.month + adduct < 0 ? this._pseudoDate.month + adduct + 12 : this._pseudoDate.month + adduct;



    if (this.view === 'date') {
      // Show the calender for the next month
      this._pseudoDate.year = this._pseudoDate.year + Math.floor((this._pseudoDate.month + adduct) / 12);

      this._pseudoDate.month = (baseAdder) % 12

      // Recalculate the calender
      this._dateNodes = this._generateDateViewNodes(new Date(
        this._pseudoDate.year,
        this._pseudoDate.month,
        1
      )
      )

      // Recalculate the years list
      this._years = this._generateYearsList(
        new Date(
          this._pseudoDate.year,
          this._pseudoDate.month,
          1
        )
      )
    } else if (this.view === 'year') {
      this._pseudoDate.year = this._pseudoDate.year + (adduct * this.yearViewCount);
      this._years = this._generateYearsList(
        new Date(
          this._pseudoDate.year,
          this._pseudoDate.month,
          1
        )
      )
    } else {
      return;
    }
  }

  _select(val) {

    if (this.type === 'date') {
      if (this.view === 'date') {

        this.date.setDate(val)
        this.dateSelected.emit();

      } else if (this.view === 'month') {
        this.date.setMonth(this._months.short.indexOf((val as string).toLowerCase()));
        this._pseudoDate.month = this._months.short.indexOf((val as string).toLowerCase());
        this._dateNodes = this._generateDateViewNodes();
        this.monthSelected.emit()
        this.view = 'date'
      } else {
        this.date.setFullYear(val)
        this._pseudoDate.year = val;
        this.yearSelected.emit()
        this.view = 'month'
      }
    } else {
      if (this.view === 'date') {

      }
    }
  }

  componentWillLoad() {
    this._dateNodes = this._generateDateViewNodes();
    this._years = this._generateYearsList();
    // Print(this._years);

    // Insert dummy dates into daterange

  }

  render() {

    return (
      <div id="datepicker-box">
        <div id="header">
          <div class="date-view-controls">
            <div class="month-year-view">
              <datepicker-button onClick={this._switchView.bind(this)}>
                <div id="month-year-container">
                  {
                    (
                      () => {
                        if (this.view === 'date') {
                          return [
                            <div >
                              {`${this._months.short[this._pseudoDate.month]} ${this._pseudoDate.year}`.toUpperCase()}
                            </div >,
                            <div id="down-icon-container">
                              <MdiIcon id="down-arrow" path={mdiChevronDown} />
                            </div>
                          ]
                        } else if (this.view === 'year') {
                          return [
                            <div>
                              {`${this._years[0]} - ${this._years[this._years.length - 1]}`}
                            </div>,
                            <div id="down-icon-container">
                              <MdiIcon id="up-arrow" path={mdiChevronUp} />
                            </div>
                          ]
                        }
                      }
                    )()
                  }

                </div>
              </datepicker-button>
            </div>
            <span class="flex"></span>
            <div class="navigation-buttons">
              <datepicker-button disabled={this.view === 'month'} onClick={() => this._produceBatch('previous')} compact id="right-button">
                <MdiIcon fill="rgba(0, 0, 0, 0.54)" path={mdiChevronLeft} />
              </datepicker-button>
              <datepicker-button disabled={this.view === 'month'} onClick={() => this._produceBatch('next')} compact id="left-button">
                <MdiIcon fill="rgba(0, 0, 0, 0.54)" path={mdiChevronRight} />
              </datepicker-button>
            </div>
          </div>
          {
            (
              () => {
                if (this.view === 'date') {
                  // Upper case all the items
                  let daysFormatted = this._days.shortest.map(day => toTitleCase(day));

                  // Rearrange items depending upon `startsFromMonday`
                  if (this.startsFromMonday) {
                    daysFormatted[daysFormatted.length - 1] = daysFormatted.shift()
                  }

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
        {/* The divider line */}
        <div id="divider"></div>

        {/* The main area where dates, years, and months will be shown */}
        <div id="main-area" style={{
          ...this._gridStyles[this.view]
        }}>
          <div id="date-view" style={{
            'display': this.view === 'date' ? 'grid' : 'none',
            ...this._gridStyles[this.view]
          }}>
            {this._dateNodes.map((val) =>
              (
                <div class="date">
                  {val}
                </div>
              )
            )}
          </div>
          <div id="year-view" style={{
            'display': this.view === 'year' ? 'grid' : 'none',
            ...this._gridStyles[this.view]
          }}>
            {this._years.map(val => <datepicker-button
              onClick={() => this._select(val)}
              id="year-button"
              selected={val === new Date(this.date).getFullYear()}
              bordered={val === this._currentYear}
              selectable>{val}</datepicker-button>)}
          </div>
          <div id="month-view" style={{
            'display': this.view === 'month' ? 'grid' : 'none',
            ...this._gridStyles[this.view]
          }}>
            {this._months.short.map((val => val.toUpperCase())).map(val => <datepicker-button
              onClick={() => this._select(val)}
              id="year-button"
              selected={val === this._months.short[new Date(this.date).getMonth()].toUpperCase()}
              bordered={val === this._months.short[this._today.getMonth()].toUpperCase()}
              selectable>
              {val}
            </datepicker-button>)}
          </div>

        </div>
      </div>
    );
  }
}
