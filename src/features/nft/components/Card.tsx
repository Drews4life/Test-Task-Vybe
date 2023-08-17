import { ElementType, ReactNode } from "react";
import { cn } from "../../../shared/utils/css";

export const CardImageContainer = ({
    children,
    className,
}: {
    children: ReactNode,
    className?: string,
}) => (
    <div className={cn("relative flex-1", className)}>
        <div className="relative rounded-2xl h-full">
            {children}
        </div>
    </div>
);

export const CardImage = ({
    url,
    alt,
    className,
}: {
    url: string,
    alt: string,
    className?: string,
    style?: Record<string, string>,
}) => (
    <span className="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
        <img
            alt={alt}
            src={url}
            loading="lazy"
            // FIXME: Gets shifted by other containers
            className={cn(
                'absolute inset-0 box-border padding-0 border-none m-auto block w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-cover object-center rounded-lg',
                className
            )}
        />
    </span>
)

export const CardContainer = ({
    children,
    className,
}: {
    as?: ElementType,
    children: ReactNode,
    className?: string,
}) => (
    <div
        className={cn(
            "border rounded-2xl p-[8px] flex flex-col overflow-hidden dark:border-secondary-dark relative group transition-transform transform hover:-translate-y-2 duration-500",
            className,
        )}
    >
        {children}
    </div>
)