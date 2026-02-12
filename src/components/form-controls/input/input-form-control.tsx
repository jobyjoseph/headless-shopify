import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          className={`border w-full px-3 py-1.5 outline-none ${className} ${
            error ? "border-alert-medium" : "border-gray-300"
          }`}
          {...props}
        />
        {error && (
          <div className="bg-alert-medium text-sm absolute top-full left-0 w-full px-3 py-1 text-white z-10">
            {error}
          </div>
        )}
      </div>
    </div>
  )
);

Input.displayName = "Input";

export default Input;
