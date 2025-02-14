import React from 'react';
import './UIButton.css';

export default function UIButton({className, onClick, ...props}) {

	return (
		<div {...props}
			className={"ui-button " + className}
			onClick={onClick}
		>
			{props.children}
		</div>
	);
}