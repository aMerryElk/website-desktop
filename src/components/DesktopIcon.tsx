import React from 'react';
import './DesktopIcon.css';

import IconComponent from '../types/icon';

export interface DesktopIconProps {
	name: string,
	Icon: IconComponent,
	[prop: string]: any;
}

export default function DesktopIcon({ name, Icon, ...props }: DesktopIconProps) {
	const {
		// alt = name,
		onClick = () => setSelected(true),
		onDoubleClick = () => {},
	} = props
	
	const [selected, setSelected] = React.useState(false)

  return (
    <div className={`item${selected ? " selected" : ""}`}
			onClick={onClick}
			onDoubleClick={(e) => {setSelected(false); onDoubleClick(e)}}
			{...props}
		>
			<Icon className="icon"/>
      <div className="label">{name}</div>
    </div>
  );
};