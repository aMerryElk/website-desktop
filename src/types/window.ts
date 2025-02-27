import { ReactNode } from "react";
import IconComponent from "./icon";

export type WinID = number;

export interface WindowProps {
	name?: string,
	title?: string,
	Icon?: IconComponent,
	x?: number, y?: number,
	width?: number, height?: number,
	minWidth?: number, minHeight?: number
	additionalTitlebarBtns?: React.ReactNode[],
	additionalClasses?: string[],
};

export interface WindowInstance extends WindowProps {
	id: WinID,
	onClose: (id: WinID) => void;
	Component?: React.FC<WindowInstance>;
	
	focusStack?: WinID[],
	onFocus?: (id: WinID) => void;
	onDragStart?: (id: WinID) => void;
	onDragStop?: (id: WinID) => void;
	onResizeStart?: (id: WinID) => void;
	onResizeStop?: (id: WinID) => void;
	onMaxim?: (id: WinID) => void;
	onMinim?: (id: WinID) => void;

	content?: ReactNode
	children?: any
	// [prop: string]: any;
}