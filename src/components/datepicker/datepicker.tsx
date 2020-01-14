import { Component, h, Prop, State, Watch } from '@stencil/core';
import { getFirstDayOfMonth, getNumberOfDaysInMonth, toTitleCase, print as Print } from '../../utils/utils';
import { MdiIcon } from "../../utils/functional-components";
import { mdiChevronRight, mdiChevronLeft, mdiChevronDown, mdiChevronUp } from "@mdi/js";

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
  @Prop({
    mutable: true,
    reflect: true
  }) view: 'date' | 'month' | 'year' = 'date';

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

  /**
   * The config, especially for the magic numbers
   */
  _config = {
    years_count: 20,
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
  }

  /**
   * Generates all the date nodes to be populated
   */
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
      dateNodes.push(<datepicker-button bordered={this._today.getDate() === (i + 1)} class="date-buttons" selectable compact>
        {i + 1}
      </datepicker-button>)
    }

    // Populate empty date nodes
    for (let i = 0; i < firstDayOfMonth; i++) {
      blankNodes.push(<div class="empty-date">{''}</div>);
    }

    // Final date node list
    const dateNodeList = [...blankNodes, ...dateNodes];

    return dateNodeList;
  }

  /**
   * Generates a list of years for the `year` view
   */
  _generateYearsList(date: string | Date | number = this.date): number[] {
    date = new Date(date);

    // Get the present year
    const presentYear = date.getFullYear();

    // the base integer
    const base = Math.floor(presentYear / this._config.years_count);

    // Initial year
    const initYear = base * this._config.years_count;

    // Final year
    const finalYear = ((base + 1) * this._config.years_count) - 1;

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

  componentWillLoad() {
    this._dateNodes = this._generateDateViewNodes();
    this._years = this._generateYearsList();
    Print(this._years);
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
                              {`${this._months.short[(new Date(this.date)).getMonth()]} ${(new Date(this.date)).getFullYear()}`.toUpperCase()}
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
                if (this.view === 'date') {
                  const daysFormatted = this._days.shortest.map(day => toTitleCase(day));
                  return [
                    <div class="day-header">
                      {
                        daysFormatted.map(day => <div>{day}</div>)
                      }
                    </div>
                  ];
                } else if (this.view === 'year') {

                }
              }
            )()
          }
        </div>
        <div id="divider"></div>
        <div id="main-area" style={{
          ...this._gridStyles[this.view]
        }}>
          <div id="date-view" style={{
            'display': this.view === 'date' ? 'grid' : 'none',
            ...this._gridStyles[this.view]
          }}>
            {this._dateNodes.map((val) => <div class="date">{val}</div>)}
          </div>
          <div id="year-view" style={{
            'display': this.view === 'year' ? 'grid' : 'none',
            ...this._gridStyles[this.view]
          }}>
            {this._years.map(val => <datepicker-button id="year-button" bordered={val === this._currentYear} selectable>{val}</datepicker-button>)}
          </div>

        </div>
      </div>
    );
  }
}
