import React, { useState } from 'react';

import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';

import Github	from '/src/applications/Github';
import Blog		from '/src/applications/Blog';
import Files	from '/src/applications/Files';

import { IconDesktopGithub, IconDesktopBlog, IconDesktopFolder } from '/src/assets/icons';
import './Desktop.css';


export default function Desktop() {

	const [windows, setWindows] = useState([]);
	const [focusStack, setFocusStack] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState([]);

	const [files, setFiles] = useState([{
		name: "Personal Github",
		IconComponent: IconDesktopGithub,
		attrs: { onDoubleClick: () => openWindow(Github) }
		}, {
		name: "My Blog",
		IconComponent: IconDesktopBlog,
		attrs: { onDoubleClick: () => openWindow(Blog) }
		}, {
		name: "Files",
		IconComponent: IconDesktopFolder,
		attrs: { onDoubleClick: () => openWindow(Files) }
	}]);

	function getWindow(id) {
		return windows.findLast(win => win.id === id)
	}

	function openWindow(win, overrides={}) {
		const id = Date.now();
		setWindows(prev => [...prev, {
			id: id,
			...win, ...overrides,
		}]);
		setFocusStack(prev => [...prev, id]);
	};

	function closeWindow(id) {
		setFocusStack(prev => prev.filter(val => val !== id));
		setWindows(prev => prev.filter(win => win.id !== id));
	};

	function focusWindow(id) {
		setFocusStack(prev => [...prev.filter(i => i !== id), id]);
	}

	// const unselectFiles = (items = files) {
	// 	items.map(file => )
	// }

	return (
		<div className="desktop"
			// onClick={unselectAll}
		>
			<Taskbar windows={windows} focusStack={focusStack}
				onCloseWindow={closeWindow}
				onFocusWindow={focusWindow}
			/>

			{/* Render desktop files */}
			<div className="desktop-icons">
				{files.map(file => (<DesktopIcon key={file.name}
					{...file}
				/> ))}
			</div>

			{/* Render open windows */}
			{windows.map(win => (	<win.Component key={win.id}
				id={win.id}
				focusStack={focusStack}
				onClose={closeWindow}
				onFocus={focusWindow}
				{...win.windowProps}
			>
				{win.Content}
			</win.Component> ))}
		</div>
	);
};