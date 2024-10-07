import * as React from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, required, className, type, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          id={id}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-white bg-primary px-3 py-2 text-sm text-text placeholder:text-muted-foreground focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:outline-none outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          required={required}
          {...props}
        />
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
