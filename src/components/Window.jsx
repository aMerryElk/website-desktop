import React from 'react';
import { Rnd } from 'react-rnd';
import './Window.css';

import { IconWindowClose, IconWindowMinim, IconWindowMaxim } from '/src/assets/icons';

export default function Window(props) {
	const { id, onClose, children,
		title = "",
		IconComponent = () => {},
		x = 150, y = 150, width = 350, height = 250,
		minWidth = 200, minHeight = 150,
		additionalTitlebarBtns = [],
		additionalClasses = [],
		onFocus = () => {}
	} = props

	// function onDragStart () {}
	// function onDragStop () {}

	// function onResizeStart() {}
	// function onResizeStop() {}

	function clickedClose() { onClose(id) }
	function clickedMaxim() {}
	function clickedMinim() {}	

	function onClick() {
		onFocus(id);
	}

	return (
		<Rnd
			default={{x: x, y: y, width: width, height: height}}
			minWidth={minWidth} minHeight={minHeight}
			dragHandleClassName="titlebar"
			// onDragStart={onDragStart} onDragStop={onDragStop}
			// onResizeStart={onResizeStart} onResizeStop={onResizeStop}
		>
			<div className={`window ${additionalClasses.join(" ")}`}
				onClick={onClick}
			>
				<div className="titlebar">
					<div id="window-info">
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
				<div className="content">
					{children}
				</div>
			</div>
		</Rnd>
	);
};
