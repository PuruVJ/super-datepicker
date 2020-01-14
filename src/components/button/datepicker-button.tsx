import { Component, Host, h, Prop } from '@stencil/core';

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
  
  render() {
    return (
      <Host>
        <button class={{
          'bordered': this.bordered,
          'button-container': true,
          'selectable': this.selectable,
          'compact': this.compact
        }}>
          <slot></slot>
        </button>
      </Host>
    );
  }

}
