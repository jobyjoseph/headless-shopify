import * as React from "react";

export type SearchIconProps = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const SearchIcon = React.forwardRef<SVGSVGElement, SearchIconProps>(
  ({ width = 20, height = 20, color = "black", ...rest }, ref) => {
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={rest["aria-label"] ? undefined : true}
        {...rest}
      >
        <path
          d="M0.599976 7.49267C0.599976 3.41667 3.83998 0.112671 7.83498 0.112671C11.831 0.112671 15.071 3.41667 15.071 7.49267C15.0765 9.38452 14.3606 11.2073 13.069 12.5897C13.113 12.6167 13.155 12.6497 13.193 12.6877L19.21 18.7047C19.2741 18.7653 19.3255 18.8381 19.361 18.9189C19.3965 18.9997 19.4155 19.0868 19.4167 19.1751C19.418 19.2633 19.4015 19.3509 19.3684 19.4327C19.3352 19.5145 19.2859 19.5888 19.2235 19.6512C19.1611 19.7136 19.0868 19.7629 19.005 19.7961C18.9232 19.8292 18.8356 19.8457 18.7474 19.8444C18.6591 19.8432 18.572 19.8242 18.4912 19.7887C18.4104 19.7532 18.3376 19.7018 18.277 19.6377L12.26 13.6207C12.2054 13.5665 12.1607 13.5032 12.128 13.4337C10.8921 14.3687 9.38467 14.8743 7.83498 14.8737C3.83998 14.8727 0.599976 11.5677 0.599976 7.49267ZM13.966 7.49267C13.966 4.03967 11.221 1.23967 7.83598 1.23967C4.44898 1.23967 1.70498 4.03967 1.70498 7.49267C1.70498 10.9467 4.44898 13.7467 7.83498 13.7467C11.221 13.7467 13.966 10.9467 13.966 7.49267Z"
          fill={color}
        />
      </svg>
    );
  }
);

SearchIcon.displayName = "SearchIcon";

export default React.memo(SearchIcon);
