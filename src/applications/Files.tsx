import React from "react";

import FileBrowser from "./components/FileBrowser";
import Window from "../components/Window";
import Application from "../types/application";
import { WindowInstance } from "../types/window";

import { IconWindowFileBrowser } from '../assets/icons';

const Files: Application = {
	windowProps: {
		name: 'Files',
		title: 'File Browser',
		Icon: IconWindowFileBrowser,
		
		width: 800, height: 550,
		minWidth: 500, minHeight: 400,
		
		additionalClasses: ['enable-maxim']
	},

	// Content: <FileBrowser/>,
	// Component: Window,

	Component: (props: WindowInstance) => {
		return (
			<Window {...props}>
				<FileBrowser/>
			</Window>
		);
	}
};
export default Files;