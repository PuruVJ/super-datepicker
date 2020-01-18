import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'datepicker-button',
  styleUrl: 'datepicker-button.scss',
  shadow: true
})
export class DatepickerButton {
  /**
   * Whether the button is an icon button
   */
  @Prop() compact: boolean = false;

  /**
   * Whether a border will appear around the button
   */
  @Prop() bordered: boolean = false;

  /**
   * Whether the button is selectable
   */
  @Prop() selectable: boolean = false;

  /**
   * Whether the button is selected. Works only if `selectable` is true
   */
  @Prop() selected: boolean = false

  /**
   * Whether button is disabled
   */
  @Prop() disabled: boolean = false;

  render() {
    return (
      <button class={{
        'bordered': this.bordered,
        'button-container': true,
        'selectable': this.selectable,
        'compact': this.compact,
        'disabled': this.disabled
        // 'selected': this.selectable && this.selected
      }} autoFocus={this.selectable && this.selected}>
        <slot></slot>
      </button>
    );
  }

}
