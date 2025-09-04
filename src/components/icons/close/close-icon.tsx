import * as React from "react";

export type CloseIconProps = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const CloseIcon = React.forwardRef<SVGSVGElement, CloseIconProps>(
  ({ width = 20, height = 20, color = "black", ...rest }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      aria-hidden={rest["aria-label"] ? undefined : true}
      strokeWidth="2"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      fill="none"
      stroke={color}
      {...rest}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
);

CloseIcon.displayName = "CloseIcon";

export default React.memo(CloseIcon);
