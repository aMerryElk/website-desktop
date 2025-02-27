import React from "react";
import ReactMarkdown from 'react-markdown';

import Window from "../components/Window";
import { IconWindowGithub } from '../assets/icons';

const Github = {
	windowProps: {
		name: 'Github',
		title: 'My personal Github',
		Icon: IconWindowGithub,
		
		width: 500, height: 350,
		minWidth: 250, minHeight: 200,
		
		additionalClasses: ['enable-maxim']
	},

	Component: Window,
	content: <ReactMarkdown># Hello!</ReactMarkdown>,

	// Component: ({ id, onClose, children,
	// 	props = Github.windowProps
	// }) => {
	// 	return (
	// 		<Window id={id} onClose={onClose} {...props}>
	// 			{children}
	// 		</Window>
	// 	)
	// }
};
export default Github;