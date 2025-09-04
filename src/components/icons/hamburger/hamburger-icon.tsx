import * as React from "react";

export type HamburgerIconProps = React.SVGProps<SVGSVGElement> & {
  /** SVG width (number = px or string = any CSS unit) */
  width?: number | string;
  /** SVG height (number = px or string = any CSS unit) */
  height?: number | string;
  /** Fill color for bars; defaults to current text color */
  color?: string;
};


const HamburgerIcon = React.forwardRef<SVGSVGElement, HamburgerIconProps>(
  ({ width = 20, height = 20, color = "black", ...rest }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 20 21"
        fill="none"
        aria-hidden={rest["aria-label"] ? undefined : true}
        {...rest}
      >
        <rect x="2" y="3.11267" width="16" height="1" fill={color} />
        <rect x="2" y="9.61267" width="16" height="1" fill={color} />
        <rect x="2" y="16.1127" width="16" height="1" fill={color} />
      </svg>
    );
  }
);

HamburgerIcon.displayName = "HamburgerIcon";

export default React.memo(HamburgerIcon);
