import React from 'react';
import './Taskbar.css';

import UIButton from './UIButton';
import Clock from './Clock';
import {
	IconTaskbarContact,
	IconTaskbarLang,
	IconTaskbarExit
} from '/src/assets/icons';

export default function Taskbar({ windows, onCloseWindow, onFocusWindow, focusStack }) {
	return (
		<div id="taskbar">
			<UIButton className="button-square"> <IconTaskbarContact/> </UIButton>
			<div id="taskbar-windows">
				{windows.map(w => ( <TaskbarWindowItem key={w.id} id={w.id}
					title={w.windowProps.name || ""}
					IconComponent={w.windowProps.IconComponent}
					focused={(w.id === focusStack.at(-1))}
					onClick={() => onFocusWindow(w.id)}
				/> ))}
			</div>
			<Clock id="taskbar-clock" time="09:33"/>
			<div id="taskbar-tray">
				<UIButton className="button-square">	<IconTaskbarLang/> </UIButton>
				<UIButton className="button-square">	<IconTaskbarExit/> </UIButton>
			</div>
		</div>
	);
}

function TaskbarWindowItem({ id, title, IconComponent, focused, ...props }) {
	return (
		<button className={`item${focused ? ' focused' : ''}`} {...props}>
			<IconComponent className="icon"/>
			<span>{title}</span>
		</button>
	);
}