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
  @Prop() iconOnly: boolean = false;


  render() {
    return (
      <Host>
        <div class={{
          'icon-button': this.iconOnly,
          'button': !this.iconOnly
        }}>
          <slot></slot>
        </div>
      </Host>
    );
  }

}
