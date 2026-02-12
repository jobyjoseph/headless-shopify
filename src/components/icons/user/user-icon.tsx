import * as React from "react";

export type UserIconProps = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const UserIcon = React.forwardRef<SVGSVGElement, UserIconProps>(
  ({ width = 20, height = 20, color = "black", ...rest }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 17"
      width={width}
      height={height}
      fill="none"
      aria-hidden={rest["aria-label"] ? undefined : true}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 7C10.6569 7 12 5.65685 12 4C12 2.34315 10.6569 1 9 1C7.34315 1 6 2.34315 6 4C6 5.65685 7.34315 7 9 7ZM9 8C11.2091 8 13 6.20914 13 4C13 1.79086 11.2091 0 9 0C6.79086 0 5 1.79086 5 4C5 6.20914 6.79086 8 9 8Z"
        fill={color}
      />
      <path
        d="M7 11L11 11C13.7614 11 17 13.2386 17 16V17H18V16C18 12.6863 14.3137 10 11 10L7 10C3.68631 10 2.18183e-05 12.6863 5.058e-06 16L0 17H1.00001V16C1.00002 13.2386 4.23859 11 7 11Z"
        fill={color}
      />
    </svg>
  )
);

UserIcon.displayName = "UserIcon";

export default React.memo(UserIcon);
