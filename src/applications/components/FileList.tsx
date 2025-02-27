import React from "react";

import { IconFileListDefault, IconFileListFolder, IconUIExpand,
	IconFileListImage,
	IconFileListText
} from '../../assets/icons';

import IconComponent from "../../types/icon";

import {
	FilesRoot, FileEntry,
	getFileName
} from "../../types/files";

import "./FileList.css"

type FileIconsMap = { [pattern: string]: IconComponent };
interface FileListProps {
	files: FilesRoot;
	onOpenFile: (path: string) => void;
}

export default function FileList({ files, onOpenFile }: FileListProps) {
	const fileIconDefault: IconComponent = IconFileListDefault;
	const folderIconDefault: IconComponent = IconFileListFolder;
	const fileIcons: FileIconsMap = {
		".md$": IconFileListText,
		".(jpe?g|bmp|png)$": IconFileListImage,
	}
	
	function openFile(path: string): void {
		onOpenFile(path);
	}

	function getFileIcon(entry: FileEntry, ignoreOverride: boolean = false): IconComponent {
		const [path, props] = entry;
		
		if (!ignoreOverride && Object.hasOwn(props, "Icon"))
			return props.Icon as IconComponent;
		else if (isFolder(path, files))
			return folderIconDefault;
		else for (const ext in fileIcons) if (path.match(ext))
			return fileIcons[ext];

		return fileIconDefault;
	}

	function isFolder(path: string, root: FilesRoot): boolean {
		return !Object.hasOwn(root[path], "content");
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
					{isFolder(path, files) ? <IconUIExpand id="expand"/> : ""}
				</button>)
			})}
		</div>
	)
}