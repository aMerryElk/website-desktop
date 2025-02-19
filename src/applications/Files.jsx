import React from "react";

import Window from "/src/components/Window";
import FileBrowser from "./components/FileBrowser";
import { IconWindowFileBrowser } from '/src/assets/icons';

const Files = {
	windowProps: {
		name: 'Files',
		title: 'File Browser',
		IconComponent: IconWindowFileBrowser,
		
		width: 800, height: 550,
		minWidth: 500, minHeight: 400,
		
		additionalClasses: ['enable-maxim']
	},

	Component: WindowFileBrowser,
	// Content: <FileBrowser/>,
};
export default Files;

export function WindowFileBrowser({ id, onClose, ...props }) {
	return (
		<Window id={id} onClose={onClose} {...props}>
			<FileBrowser/>
		</Window>
	);
}
