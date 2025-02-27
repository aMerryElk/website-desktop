import React from 'react';
// import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import './FileBrowser.css';

import FileList from './FileList';

import { IconDesktopBlog } from '../../assets/icons';
import { FilesRoot, getFilesUnder } from '../../types/files';

export default function FileBrowser({}) {
	const [previewContent, setPreviewContent] = useState("PREVIEW")
	const [workingDir, setWorkingDir] = useState<string[]>([])

	const filesystem: FilesRoot = {
		"folder1": {Icon: IconDesktopBlog},
			"folder1,file1.md": {content: "some doc"},
			"folder1,file2.jpg": {content: "some img"},
			"folder1,subfolder1": {},
				"folder1,subfolder1,file1.pdf": {content: "some pdf"},
				"folder1,subfolder1,file2.bmp": {content: "some img"},
		"folder2": {},
			"folder2,file1.pdf": {content: "is this a .pdf?"},
	}

	function onOpenFile(path: string) {
		console.log("Opened", path);
		setPreviewContent(filesystem[path].content || "")
	}

	return (
		<PanelGroup direction="horizontal">
			<Panel minSize={20}>
				<FileList files={getFilesUnder(filesystem, ["folder1"])}
					onOpenFile={path => onOpenFile(path)}
				/>
			</Panel>
			<PanelResizeHandle className='separator-v'/>
			<Panel>
				{previewContent}
			</Panel>
		</PanelGroup>
	);
};