import IconComponent from "./icon";

export type FilePath = string;

export interface FileProps {
	content?: any;
	Icon?: IconComponent;
	[property: string]: any;
}

/** `path` is a comma-separated string for convenience in converting lists of strings to a path. */
export type FileEntry = [path: FilePath, props: FileProps];
export type FilesRoot = Record<FilePath, FileProps>;

/**
 * Takes a path and returns an object containing its, `name`, `extension`, and full name `full`
 * @param path - separated by commas. For example: `"dir,subdir,file.ext"` 
 * @returns {{full: string, name: string, extension: string}}
 */
export function getFileName(path: FilePath): { full: string; name: string; extension: string; } {
	const fileName = path.split(",").at(-1);
	if (!fileName) return {full: "", name: "", extension: ""};

	const match = fileName.match(/(.+?)(\.[^.]*$|$)/);
	if (!match) return {full: fileName, name: fileName, extension: ""};
		
	const [_, name, ext] = match;
	return {full: fileName, name: name, extension: ext};
}

/**
 * Filters all files in `root` downstream of `path`.
 * @param root - contains all files
 * @param path - if not provided, searches all files inside `root`
 * @param depth - `0`: direct children, `1`: children and grandchildren, etc. Accepts `Infinity`
 */
export function getFilesUnder(root: FilesRoot, path: string[]=[], depth=0): FilesRoot {
	const pathStr = path.toString();
	const files = Object.entries(root).filter( ([filePathStr, _]) => {
		if (!filePathStr.startsWith(pathStr)) return false;
		
		const filePath = filePathStr.split(",");
		const fileDepth = filePath.length - path.length - 1	

		return fileDepth >= 0 && fileDepth <= depth
	})

	return Object.fromEntries(files)
}





