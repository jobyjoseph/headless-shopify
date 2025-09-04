import * as React from "react";

export type BagIconProps = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const BagIcon = React.forwardRef<SVGSVGElement, BagIconProps>(
  ({ width = 20, height = 20, color = "black", ...rest }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 24"
      width={width}
      height={height}
      aria-hidden={rest["aria-label"] ? undefined : true}
      {...rest}
    >
      <path
        className="bag-path-static"
        d="M17.54 5.424a.47.47 0 0 1 .46.474v17.627a.47.47 0 0 1-.46.475H.46a.47.47 0 0 1-.46-.475V5.898a.47.47 0 0 1 .46-.474h4.795v-1.56C5.255 1.733 6.935 0 9 0c2.065 0 3.745 1.733 3.745 3.864v1.56zm-11.365 0h5.64v-1.56c0-1.608-1.264-2.915-2.82-2.915-1.555 0-2.82 1.307-2.82 2.915zm10.905.949h-4.335V8.61a.47.47 0 0 1-.46.475.47.47 0 0 1-.46-.475V6.373h-5.65V8.61a.47.47 0 0 1-.46.475.47.47 0 0 1-.46-.475V6.373H.92V23.05h16.16z"
        fill={color}
      />
    </svg>
  )
);

BagIcon.displayName = "BagIcon";

export default React.memo(BagIcon);
