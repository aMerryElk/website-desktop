// Vite feature imports multiple files at once
const iconComponents = import.meta.glob('./pixelarticons_24/*.svg', {
	eager: true,
	query: '?react' // Import the SVGs as React components using vite-plugin-svgr
});

// Then we clean up the names
const PixelArtIcons24 = Object.fromEntries(
	Object.entries(iconComponents).map(([key, icon]) => {
		// Remove path and extension
		let iconName = key.replace(/^\.\/pixelarticons_24\/(.*)\.svg$/, '$1');

		// // To use the components directly, their names need to be capitalized
		// iconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

		return [iconName, icon.default];
	})
);

export default PixelArtIcons24;
