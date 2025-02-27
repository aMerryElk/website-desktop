import React from "react";
import ReactMarkdown from 'react-markdown';

import Window from "../components/Window";
import { IconWindowBlog } from '../assets/icons';

const Blog = {
	windowProps: {
		name: 'Blog',
		title: 'I write for fun',
		Icon: IconWindowBlog,
		
		// additionalClasses: ['pride']
	},

	Component: Window,
	content: <ReactMarkdown># Science = Magic + Math</ReactMarkdown>,
};
export default Blog;