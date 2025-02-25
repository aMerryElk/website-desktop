export type FileIconComponent = React.FC<{ className?: string }>;

// Interface for file properties in the file system
export interface FileProps {
	content?: string;
	Icon?: FileIconComponent;
	[property: string]: any;
}

export type FileEntry = [path: string, props: FileProps];
export type FilesRoot = Record<string, FileProps>;
