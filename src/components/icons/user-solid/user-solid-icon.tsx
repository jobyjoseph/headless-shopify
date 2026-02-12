import * as React from "react";

export type UserSolidIconProps = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const UserSolidIcon = React.forwardRef<SVGSVGElement, UserSolidIconProps>(
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
        d="M13 4C13 6.20914 11.2091 8 9 8C6.79086 8 5 6.20914 5 4C5 1.79086 6.79086 0 9 0C11.2091 0 13 1.79086 13 4Z"
        fill={color}
      />
      <path
        d="M5.058e-06 16C2.18183e-05 12.6863 3.68631 10 7 10L11 10C14.3137 10 18 12.6863 18 16V17H0L5.058e-06 16Z"
        fill={color}
      />
    </svg>
  )
);

UserSolidIcon.displayName = "AccountSolidIcon";

export default React.memo(UserSolidIcon);
