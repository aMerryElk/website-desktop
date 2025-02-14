import React from "react";
import "./Clock.css"
import { IconDarkMode, IconLightMode } from '/src/assets/icons';

export default function Clock({time}) {
	const [darkMode, setDarkMode] = React.useState(true);
	const [display, setDisplay] = React.useState(time);

	function toggleDarkMode() {
		setDarkMode(!darkMode)
		setDisplay(darkMode ? "08:33" : "20:56");
	}

	return (
		<div id="clock"
			onClick={toggleDarkMode}
		>
			{ darkMode ? <IconDarkMode className="icon"/> : <IconLightMode className="icon"/> }
			<span>{display}</span>
		</div>
	);
}