import React from "react";
import ReactMarkdown from 'react-markdown';

import Window from "/src/components/Window";
import { IconWindowBlog } from '/src/assets/icons';

const Blog = {
	windowProps: {
		name: 'Blog',
		title: 'I write for fun',
		IconComponent: IconWindowBlog,
		
		// additionalClasses: ['pride']
	},

	Component: Window,
	Content: <ReactMarkdown># Science = Magic + Math</ReactMarkdown>,
};
export default Blog;