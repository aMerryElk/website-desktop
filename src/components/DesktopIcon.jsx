import React from 'react';
import './DesktopIcon.css';

const DesktopIcon = ({ IconComponent, name, attrs }) => {
	const {
		alt = name,
		onClick = () => setSelected(true),
		onDoubleClick = () => {},
	} = attrs
	
	const [selected, setSelected] = React.useState(false)

  return (
    <div className={`item${selected ? " selected" : ""}`}
			onClick={onClick}
			onDoubleClick={(e) => {setSelected(false); onDoubleClick(e)}}
			{...attrs}
		>
			<IconComponent className="icon" alt={alt}/>
      <div className="label">{name}</div>
    </div>
  );
};

export default DesktopIcon;
