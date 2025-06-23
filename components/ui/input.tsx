"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, X } from "lucide-react";

const inputVariants = cva(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "",
                destructive:
                    "border-[hsl(var(--color-destructive))] focus-visible:ring-[hsl(var(--color-destructive))]",
                ghost:
                    "border-transparent bg-[hsl(var(--color-accent))] focus-visible:bg-[hsl(var(--color-input))] focus-visible:border-[hsl(var(--color-border))]",
            },
            size: {
                default: "h-10 px-4 py-2",
                lg: "h-10 px-4 py-2",
                normal: "h-9 px-3 py-2",
                sm: "h-8 px-2 py-1 text-xs",
                xl: "h-12 px-6 py-3 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: boolean;
    clearable?: boolean;
    onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            size,
            type = "text",
            leftIcon,
            rightIcon,
            error,
            clearable,
            onClear,
            value,
            ...props
        },
        ref,
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const [internalValue, setInternalValue] = React.useState(
            props.defaultValue || "",
        );

        const inputVariant = error ? "destructive" : variant;
        const isPassword = type === "password";
        const actualType = isPassword && showPassword ? "text" : type;

        // Determine if this is a controlled component
        const isControlled = value !== undefined;
        const inputValue = isControlled ? value : internalValue;
        const showClearButton =
            clearable && inputValue && String(inputValue).length > 0;

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalValue(e.target.value);
            }
            props.onChange?.(e);
        };

        const handleClear = () => {
            const clearEvent = {
                target: { value: "" },
                currentTarget: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>;

            if (!isControlled) {
                setInternalValue("");
            }
            onClear?.();
            props.onChange?.(clearEvent);
        };

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return (
            <div className="relative w-full">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))] [&_svg]:size-4 [&_svg]:shrink-0 z-10">
                        {leftIcon}
                    </div>
                )}

                <input
                    type={actualType}
                    className={cn(
                        inputVariants({ variant: inputVariant, size, className }),
                        leftIcon && "pl-10",
                        (rightIcon || isPassword || showClearButton) && "pr-10",
                    )}
                    ref={ref}
                    {...(isControlled
                        ? { value: inputValue }
                        : { defaultValue: props.defaultValue })}
                    onChange={handleInputChange}
                    {...(({ defaultValue, ...rest }) => rest)(props)}
                />

                {/* Right side icons container */}
                {(rightIcon || isPassword || showClearButton) && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
                        {/* Custom right icon */}
                        {rightIcon && (
                            <div className="text-[hsl(var(--color-muted-foreground))] [&_svg]:size-4 [&_svg]:shrink-0">
                                {rightIcon}
                            </div>
                        )}

                        {/* Clear button */}
                        {showClearButton && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
                                tabIndex={-1}
                            >
                                <X />
                            </button>
                        )}

                        {/* Password visibility toggle */}
                        {isPassword && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] transition-colors [&_svg]:size-4 [&_svg]:shrink-0"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";

export { Input, inputVariants };