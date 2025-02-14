import React, { useState } from 'react';

import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';

import Github	from '/src/applications/Github';
import Blog		from '/src/applications/Blog';

import { IconDesktopGithub, IconDesktopBlog } from '/src/assets/icons';
import './Desktop.css';

export default function Desktop() {

	const [windows, setWindows] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);

	const [files, setFiles] = useState([
		{name: "Personal Github",
			IconComponent: IconDesktopGithub,
			attrs: { onDoubleClick: () => openWindow(Github) }
		},
		{name: "My Blog",
			IconComponent: IconDesktopBlog,
			attrs: { onDoubleClick: () => openWindow(Blog) }
		}
	]);

	const getWindow = id => {
		return windows.filter(win => win.id === id)
	}

	const openWindow = ( win, overrides={} ) => {
		// const props = {...win.props, ...overrides.props}
		setWindows(prev => [...prev, {
			id: Date.now(),
			onClose: closeWindow,
			...win, ...overrides,
			// props: props,
		}]);
	};

	const closeWindow = id => {
		setWindows(prev => prev.filter(win => win.id !== id));
	};

	const focusWindow = id => {
		const oldFocus = windows.at(-1);
		const newFocus = getWindow(id);
		oldFocus["focused"] = false;
		newFocus["focused"] = true;
		newFocus.windowProps["additionalClasses"] = [ "pride" ];


		setWindows([...windows.filter(win => win.id !== id), ...newFocus])
	}

	// const unselectFiles = (items = files) {
	// 	items.map(file => )
	// }

	return (
		<div className="desktop"
			// onClick={unselectAll}
		>
			<Taskbar windows={windows}
				onCloseWindow={closeWindow}
				onFocusWindow={focusWindow}
			/>

			<div className="desktop-icons">
				{/* Render desktop files */}
				{files.map(file => (<DesktopIcon key={file.name} {...file}/>))}
			</div>

			{/* Render open windows */}
			{windows.map(window => (	<window.Component key={window.id}
				id={window.id}
				onClose={window.onClose}
				{...window.windowProps}
			>
				{window.Content}
				{/* <window.Content/> */}
			</window.Component> ))}
		</div>
	);
};