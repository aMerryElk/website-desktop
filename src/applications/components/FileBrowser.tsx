// import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import './FileBrowser.css';

import FileList from './FileList';

import { IconDesktopBlog } from '../../assets/icons';
import { FilesRoot } from '../../types/files';

export default function FileBrowser({}) {
	
	const [previewContent, setPreviewContent] = useState("PREVIEW")

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

	/**
	 * Filters all files in `root` downstream of `path`.
	 * @param {object.<string[], object>} root - contains all files
	 * @param {string[]=} path - if not provided, searches all files inside `root`
	 * @param {number=} depth - `0`: direct children, `1`: children and grandchildren, etc. Accepts `Infinity`
	 * @returns {object.<string[], object>}
	 */
	function getFilesUnder(root: FilesRoot, path: string[] = [], depth=0) {
		const pathStr = path.toString();
		const files = Object.entries(root).filter( ([filePathStr, _]) => {
			if (!filePathStr.startsWith(pathStr)) return false;
		
			const filePath = filePathStr.split(",");
			const fileDepth = filePath.length - path.length - 1	

			return fileDepth >= 0 && fileDepth <= depth
		})

		return Object.fromEntries(files)
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