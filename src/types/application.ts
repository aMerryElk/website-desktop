import { WindowProps, WindowInstance } from "./window";

type Application = {
	windowProps: WindowProps,
	// Component: (props: any) => any,
	Component?: React.FC<WindowInstance>,
	content?: any
};

export default Application;