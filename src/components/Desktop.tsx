import React from 'react';

import DesktopIcon, { DesktopIconProps } from './DesktopIcon';
import Taskbar from './Taskbar';
import { WinID, WindowInstance} from '../types/window';

import Application from '../types/application';
import Github	from '../applications/Github';
import Blog		from '../applications/Blog';
import Files	from '../applications/Files';

import { IconDesktopGithub, IconDesktopBlog, IconDesktopFolder } from '../assets/icons';
import './Desktop.css';
import Window from './Window';

export default function Desktop() {

	const [windows, setWindows] = React.useState<WindowInstance[]>([]);
	const [focusStack, setFocusStack] = React.useState<WinID[]>([]);
	// const [selectedFiles, setSelectedFiles] = React.useState([]);

	const [files, _] = React.useState<DesktopIconProps[]>([{
		name: "Personal Github",
		Icon: IconDesktopGithub,
		onDoubleClick: () => openWindow(Github)
		}, {
		name: "My Blog",
		Icon: IconDesktopBlog,
		onDoubleClick: () => openWindow(Blog)
		}, {
		name: "Files",
		Icon: IconDesktopFolder,
		onDoubleClick: () => openWindow(Files)
	}]);

	// function getWindow(id: number) {
	// 	return windows.findLast(win => win.id === id)
	// }

	function openWindow({windowProps, ...app}: Application, propOverrides={}) {
		const id = Date.now();
		setFocusStack(prev => [...prev, id]);

		const newWindow: WindowInstance = {
			id: id,
			onClose: closeWindow,
			onFocus: focusWindow,
			Component: app.Component || Window,
			...app,
			...windowProps,
			...propOverrides
		};
		
		setWindows(prev => [...prev, newWindow]);
	};

	function closeWindow(id: WinID) {
		setFocusStack(prev => prev.filter(val => val !== id));
		setWindows(prev => prev.filter(win => win.id !== id));
	};

	function focusWindow(id: WinID) {		
		setFocusStack(prev => [...prev.filter(i => i !== id), id]);
	}

	return (
		<div className="desktop">
			<Taskbar windows={windows} focusStack={focusStack}/>

			{/* Render desktop files */}
			<div className="desktop-icons">
				{files.map(file => <DesktopIcon key={file.name} {...file}/>)}
			</div>

			{/* Render open windows */}
			{windows.map(({id, Component, content="", ...props}: WindowInstance) => {
				if (!Component) throw Error("COMPONENT NOT FOUND");
				return (
					<Component key={id} id={id} focusStack={focusStack} {...props}>
						{content}
					</Component>
				)
			})}
		</div>
	);
};