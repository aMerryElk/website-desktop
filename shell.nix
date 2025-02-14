{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
	packages = [
		pkgs.nodejs
	];

	shellHook = ''
		if [ ! -d "node_modules" ]; then
			echo "installing required packages..."
			npm install
		fi

		echo "npm run dev|build"
	'';
}
