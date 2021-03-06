import { Component, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'datepicker-button',
  styleUrl: 'datepicker-button.scss',
  shadow: true
})
export class DatepickerButton {
  @Element() rootEl!: HTMLElement;

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
  @Prop({
    mutable: true,
    reflect: true
  }) selected: boolean = false

  /**
   * Whether button is disabled
   */
  @Prop() disabled: boolean = false;

  _buttonEl: HTMLButtonElement;

  componentDidLoad() {
    this._buttonEl.onclick = () => {
      this.selected = this.selected === true ? false : true
    }
  }

  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        <button
          ref={el => this._buttonEl = el}
          id="button-el"
          class={{
            'bordered': this.bordered,
            'button-container': true,
            'selectable': this.selectable,
            'compact': this.compact,
            'disabled': this.disabled,
            'selected': this.selectable && this.selected
          }}>
          <slot></slot>
        </button>
      </div>
    );
  }

}
