import React from "react";
import "./FileList.css"

import IconExpand from "../../assets/icons/pixelarticons_24/chevron-right.svg?react";

import { IconFileListDefault, IconFileListFolder,
	IconFileListImage,
	IconFileListText
} from '../../assets/icons';



export default function FileList({ files, onOpenFile }) {
	
	const fileIconDefault = IconFileListDefault
	const folderIconDefault = IconFileListFolder
	const fileIcons = {
		".md$": IconFileListText,
		".(jpe?g|bmp|png)$": IconFileListImage,
	}
	function openFile(path) {
		onOpenFile(path)
	}

	/**
	 * Takes a path and returns an object containing its, `name`, `extension`, and full name `full`
	 * @param {string} path - separated by commas. For example: `"dir,subdir,file.ext"` 
	 * @returns {{full: string, name: string, extension: string}}
	 */
	function getFileName(path) {
		const fileName = path.split(",").at(-1);
		const [_, name, ext] = fileName.match("(.+?)(\\.[^.]*$|$)");

		return {full: fileName, name: name, extension: ext}
	}

	function getFileIcon([path, props], ignoreOverride=false) {
		if (!ignoreOverride && Object.hasOwn(props, "Icon"))
			return props.Icon;
		else if (isFolder(path))
			return folderIconDefault;
		else for (const ext in fileIcons) if (path.match(ext))
			return fileIcons[ext];
	}

	function isFolder(path) {
		return !Object.hasOwn(files[path], "content")
	}

	return (
		<div className="file-list">
			{Object.entries(files).map(([path, props]) => {
				const Icon = getFileIcon([path, props]);
				const name = getFileName(path);
				return (
				<button className="item" key={name.full} onClick={() => openFile(path)}>
					<Icon className="icon"/>
					<span>{name.full}</span>
					{isFolder(path) ? <IconExpand id="expand"/> : ""}
				</button>)
			})}
		</div>
	)
}