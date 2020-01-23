import { h } from '@stencil/core'

interface IMdiIcon {
  size?: number;
  path?: string;
  fill?: string;
  classes?: string;
  id?: string;
}

const MdiIcon = (props: IMdiIcon) => {
  let { size, path, fill, id, classes } = props;
  size = size || 24;
  fill = fill || 'black'
  return (
    <svg
      id={id}
      class={classes}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`
      }>
      <path d={path} />
    </svg>)
}

export {
  MdiIcon
}