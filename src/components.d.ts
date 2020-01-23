/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface DatepickerButton {
    /**
    * Whether a border will appear around the button
    */
    'bordered': boolean;
    /**
    * Whether the button is an icon button
    */
    'compact': boolean;
    /**
    * Whether button is disabled
    */
    'disabled': boolean;
    /**
    * Whether the button is selectable
    */
    'selectable': boolean;
    /**
    * Whether the button is selected. Works only if `selectable` is true
    */
    'selected': boolean;
  }
  interface SuperDatepicker {
    /**
    * Selected date Note: Shouldn't be used with `range`. If both `range` and `date` are set, `range` will be prioritized.
    */
    'date': Date;
    /**
    * The dateranges that are to be shown as selected
    */
    'daterange': Date[];
    /**
    * Whether the calender starts from sunday or monday
    */
    'startsFromMonday': false;
    /**
    * Whether the component works as a datepicker or a rangepicker
    */
    'type': 'date' | 'range';
    /**
    * The current view of the datepicker
    */
    'view': 'date' | 'month' | 'year';
    /**
    * The number of years to be shown in a single view
    */
    'yearViewCount': number;
  }
}

declare global {


  interface HTMLDatepickerButtonElement extends Components.DatepickerButton, HTMLStencilElement {}
  var HTMLDatepickerButtonElement: {
    prototype: HTMLDatepickerButtonElement;
    new (): HTMLDatepickerButtonElement;
  };

  interface HTMLSuperDatepickerElement extends Components.SuperDatepicker, HTMLStencilElement {}
  var HTMLSuperDatepickerElement: {
    prototype: HTMLSuperDatepickerElement;
    new (): HTMLSuperDatepickerElement;
  };
  interface HTMLElementTagNameMap {
    'datepicker-button': HTMLDatepickerButtonElement;
    'super-datepicker': HTMLSuperDatepickerElement;
  }
}

declare namespace LocalJSX {
  interface DatepickerButton {
    /**
    * Whether a border will appear around the button
    */
    'bordered'?: boolean;
    /**
    * Whether the button is an icon button
    */
    'compact'?: boolean;
    /**
    * Whether button is disabled
    */
    'disabled'?: boolean;
    /**
    * Whether the button is selectable
    */
    'selectable'?: boolean;
    /**
    * Whether the button is selected. Works only if `selectable` is true
    */
    'selected'?: boolean;
  }
  interface SuperDatepicker {
    /**
    * Selected date Note: Shouldn't be used with `range`. If both `range` and `date` are set, `range` will be prioritized.
    */
    'date'?: Date;
    /**
    * The dateranges that are to be shown as selected
    */
    'daterange'?: Date[];
    /**
    * Fired when date(1 - 31, not the Date() object) is selected
    */
    'onDateSelected'?: (event: CustomEvent<any>) => void;
    /**
    * Fired when month is selected
    */
    'onMonthSelected'?: (event: CustomEvent<any>) => void;
    /**
    * Fired when year is selected
    */
    'onYearSelected'?: (event: CustomEvent<any>) => void;
    /**
    * Whether the calender starts from sunday or monday
    */
    'startsFromMonday'?: false;
    /**
    * Whether the component works as a datepicker or a rangepicker
    */
    'type'?: 'date' | 'range';
    /**
    * The current view of the datepicker
    */
    'view'?: 'date' | 'month' | 'year';
    /**
    * The number of years to be shown in a single view
    */
    'yearViewCount'?: number;
  }

  interface IntrinsicElements {
    'datepicker-button': DatepickerButton;
    'super-datepicker': SuperDatepicker;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'datepicker-button': LocalJSX.DatepickerButton & JSXBase.HTMLAttributes<HTMLDatepickerButtonElement>;
      'super-datepicker': LocalJSX.SuperDatepicker & JSXBase.HTMLAttributes<HTMLSuperDatepickerElement>;
    }
  }
}


