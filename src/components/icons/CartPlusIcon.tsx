import React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
  color?: string;
}

export const CartPlusIcon: React.FC<IconProps> = ({
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
    <path d="M17 18C15.89 18 15 18.89 15 20C15 21.11 15.89 22 17 22C18.11 22 19 21.11 19 20C19 18.89 18.11 18 17 18M7 18C5.89 18 5 18.89 5 20C5 21.11 5.89 22 7 22C8.11 22 9 21.11 9 20C9 18.89 8.11 18 7 18M7.2 14.63C7.18 14.66 7.17 14.7 7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.11 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10.5V8H13.5V6H10.5V3H8.5V6H5.5V8H8.5V11Z" />
  </svg>
);

export default CartPlusIcon;
