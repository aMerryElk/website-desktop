import React from 'react';
import { Rnd } from 'react-rnd';
import './Window.css';

import { WindowInstance } from '../types/window';

import { IconWindowClose, IconWindowMinim, IconWindowMaxim } from '../assets/icons';
import { BLANK_ICON } from '../types/icon';


export default function Window({ id, focusStack, ...props}: WindowInstance) {

	if (!focusStack) throw Error("focusStack has an invalid value.");

	const Icon = props.Icon || BLANK_ICON;
	const geometry = {
		x: props.x || 150, y: props.y || 150,
		width: props.width || 350, height: props.height || 250
	}

	function onDragStart ()		{ props.onFocus?.(id); props.onDragStart?.(id) }
	function onDragStop ()		{ props.onDragStop?.(id) }
	function onResizeStart()	{ props.onResizeStart?.(id) }
	function onResizeStop()		{ props.onResizeStop?.(id) }

	function onClick() { props.onFocus?.(id) }
	function clickedClose() { props.onClose(id) }
	function clickedMaxim() { props.onMaxim?.(id) }
	function clickedMinim() { props.onMinim?.(id) }

	const focus = focusStack.indexOf(id) + 1;
	const classStr = `${(focusStack.at(-1) === id) ?
		`focused ${props.additionalClasses?.join(" ")}` :
		        `${props.additionalClasses?.join(" ")}`
	}`;

	return (
		<Rnd default={geometry}
		bounds="parent"
		style={{zIndex: focus}}
		dragHandleClassName="titlebar"
		className={`window-container ${classStr}`}
		minWidth={props.minWidth || 200} minHeight={props.minHeight || 150}

		onDragStart={onDragStart} onDragStop={onDragStop}
		onResizeStart={onResizeStart} onResizeStop={onResizeStop}
		>
			{/* We don't add onClick to the parent element because otherwise,
			clicking close triggers it. Since we're focusing the window and
			removing it from the focus stack within the same re-render, React
			gets confused and doesn't do the second one for some reason. */}
			<div className={`window ${classStr}`}>
				<div className="titlebar">
					<div id="window-info" onClick={onClick}>
						{/* <div className="icon"> <Icon/> </div> */}
						<Icon className="icon"/>
						<span>{props.title || "UNTITLED"}</span>
					</div>
					<div id="window-controls">
 						<button id='close' onClick={clickedClose}> <IconWindowClose/> </button>
 						<button id='maxim' onClick={clickedMaxim}> <IconWindowMaxim/> </button>
 						<button id='minim' onClick={clickedMinim}> <IconWindowMinim/> </button>
						{...(props.additionalTitlebarBtns || [])}
					</div>
				</div>
				<div className="content" onClick={onClick}>
					{props.children}
				</div>
			</div>
		</Rnd>
	);
};
