import React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  color?: string;
}

export const CheckMarkIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  width = size,
  height = size,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill={color}
    aria-hidden="true"
    role="img"
    {...props}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
  </svg>
);

export default CheckMarkIcon;
