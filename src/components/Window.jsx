import React from 'react';
import { Rnd } from 'react-rnd';
import './Window.css';

import { IconWindowClose, IconWindowMinim, IconWindowMaxim } from '/src/assets/icons';

export default function Window(props) {
	const { id, onClose, children, focusStack,
		title = "",
		IconComponent = () => {},
		x = 150, y = 150, width = 350, height = 250,
		minWidth = 200, minHeight = 150,
		additionalTitlebarBtns = [],
		additionalClasses = [],
		onFocus = () => {},
	} = props

	function onDragStart () { onFocus(id) }
	function onDragStop () {}

	// function onResizeStart() {}
	// function onResizeStop() {}

	function clickedClose() { onClose(id) }
	function clickedMaxim() {}
	function clickedMinim() {}	

	function onClick() { onFocus(id) }

	const focus = focusStack.indexOf(id) + 1;
	const classStr = `${(focusStack.at(-1) === id) ?
		`focused ${additionalClasses.join(" ")}` :
		        `${additionalClasses.join(" ")}`
	}`;

	return (
		<Rnd
		dragHandleClassName="titlebar"
		default={{x: x, y: y, width: width, height: height}}
		minWidth={minWidth} minHeight={minHeight}
		onDragStart={onDragStart} onDragStop={onDragStop}
		// onResizeStart={onResizeStart} onResizeStop={onResizeStop}
		bounds="parent"
		style={{zIndex: focus}}
		className={`window-container ${classStr}`}
		>
			{/* We don't add onClick to the parent element because otherwise,
			clicking close triggers it. Since we're focusing the window and
			removing it from the focus stack within the same re-render, React
			gets confused and doesn't do the second one for some reason. */}
			<div className={`window ${classStr}`}>
				<div className="titlebar">
					<div id="window-info" onClick={onClick}>
						<div className="icon"> <IconComponent/> </div>
						<span>{title}</span>
					</div>
					<div id="window-controls">
 						<button id='close' onClick={clickedClose}> <IconWindowClose/> </button>
 						<button id='maxim' onClick={clickedMaxim}> <IconWindowMaxim/> </button>
 						<button id='minim' onClick={clickedMinim}> <IconWindowMinim/> </button>
						{...additionalTitlebarBtns}
					</div>
				</div>
				<div className="content" onClick={onClick}>
					{children}
				</div>
			</div>
		</Rnd>
	);
};
