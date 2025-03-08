import React from "react";
import { twMerge } from "tailwind-merge";

type PaddingConfig = {
	vertical?: string;
	horizontal?: string;
	mobileMultiplier?: number;
};

interface LayoutProps {
	children: React.ReactNode;
	padding?: string;
	paddingConfig?: PaddingConfig;
	maxWidth?: string;
	className?: string;
}

const defaultPaddingConfig: PaddingConfig = {
	vertical: "py-10",
	horizontal: "px-5",
	mobileMultiplier: 0.5,
};

export const Layout: React.FC<LayoutProps> = ({
	children,
	padding,
	paddingConfig = defaultPaddingConfig,
	maxWidth = "",
	className,
}) => {
	const getPaddingClasses = () => {
		if (padding) return padding;

		const { vertical, horizontal, mobileMultiplier = 0.5 } = paddingConfig;

		const baseClasses = `${vertical || ""} ${horizontal || ""}`;

		if (!mobileMultiplier) return baseClasses;

		const mobileVertical = vertical?.replace(/\d+/g, (m) =>
			Math.floor(Number(m) * mobileMultiplier).toString()
		);

		const mobileHorizontal = horizontal?.replace(/\d+/g, (m) =>
			Math.floor(Number(m) * mobileMultiplier).toString()
		);

		return `${baseClasses} ${mobileVertical ? "md:" + vertical : ""} ${
			mobileHorizontal ? "md:" + horizontal : ""
		}`;
	};

	const layoutClasses = twMerge(
		`
   
    ${maxWidth}
    ${getPaddingClasses()}
  `,
		className
	);

	return <div className={layoutClasses}>{children}</div>;
};
