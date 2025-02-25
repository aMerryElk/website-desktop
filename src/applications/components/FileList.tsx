// import React from "react";
import "./FileList.css"

import IconExpand from "../../assets/icons/pixelarticons_24/chevron-right.svg?react";

import { IconFileListDefault, IconFileListFolder,
	IconFileListImage,
	IconFileListText
} from '../../assets/icons';

import { FilesRoot, FileIconComponent, FileProps } from "../../types/files";

interface FileListProps {
	files: FilesRoot;
	onOpenFile: (path: string) => void;
}

type FileIconsMap = {
	[pattern: string]: FileIconComponent;
};

export default function FileList({ files, onOpenFile }: FileListProps) {
	
	const fileIconDefault: FileIconComponent = IconFileListDefault;
	const folderIconDefault: FileIconComponent = IconFileListFolder;
	const fileIcons: FileIconsMap = {
		".md$": IconFileListText,
		".(jpe?g|bmp|png)$": IconFileListImage,
	}
	
	function openFile(path: string): void {
		onOpenFile(path);
	}

	/**
	 * Takes a path and returns an object containing its, `name`, `extension`, and full name `full`
	 * @param {string} path - separated by commas. For example: `"dir,subdir,file.ext"` 
	 * @returns {{full: string, name: string, extension: string}}
	 */
	function getFileName(path: string): { full: string; name: string; extension: string; } {
		const fileName = path.split(",").at(-1);
		if (!fileName) return {full: "", name: "", extension: ""};

		const match = fileName.match(/(.+?)(\.[^.]*$|$)/);
		if (!match) return {full: fileName, name: fileName, extension: ""};
		
		const [_, name, ext] = match;

		return {full: fileName, name: name, extension: ext};
	}

	function getFileIcon(entry: [string, FileProps], ignoreOverride: boolean = false): FileIconComponent {
		const [path, props] = entry;
		
		if (!ignoreOverride && Object.hasOwn(props, "Icon"))
			return props.Icon as FileIconComponent;
		else if (isFolder(path))
			return folderIconDefault;
		else {
			for (const ext in fileIcons) {
				if (path.match(ext)) {
					return fileIcons[ext];
				}
			}
			return fileIconDefault;
		}
	}

	function isFolder(path: string): boolean {
		return !Object.hasOwn(files[path], "content");
	}

	return (
		<div className="file-list">
			{Object.entries(files).map(([path, props]) => {
				const Icon = getFileIcon([path, props as FileProps]);
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