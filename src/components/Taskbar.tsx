import React from 'react';
import './Taskbar.css';

import Clock from './Clock';

import {
	IconTaskbarContact,
	IconTaskbarLang,
	IconTaskbarExit
} from '../assets/icons';
import { BLANK_ICON } from '../types/icon';
import { WindowInstance } from '../types/window';

export default function Taskbar({ windows, focusStack }) {
	return (
		<div id="taskbar">
			<button className="button-square"> <IconTaskbarContact/> </button>
			<div id="taskbar-windows">
				{windows.map((w: WindowInstance) => ( <TaskbarWindowItem key={w.id} id={w.id}
					title={w.name || w.title}
					Icon={w.Icon || BLANK_ICON}
					focused={(w.id === focusStack.at(-1))}
					onClick={() => w.onFocus?.(w.id)}
				/> ))}
			</div>
			<Clock time="09:33"/>
			<div id="taskbar-tray">
				<button className="button-square"> <IconTaskbarLang/> </button>
				<button className="button-square"> <IconTaskbarExit/> </button>
			</div>
		</div>
	);
}

function TaskbarWindowItem({ id, title, Icon, focused, ...props }) {
	return (
		<button className={`item${focused ? ' focused' : ''}`} {...props}>
			<Icon className="icon"/>
			<span>{title}</span>
		</button>
	);
}