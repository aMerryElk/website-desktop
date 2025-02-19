# Desktop-like Website
Work in progress for a website that behaves like a desktop interface.

It's mostly something I built to learn React, but I like the idea, so I might actually use it eventually for my personal website.

Uses Vite for development.

## To do
- [x] Windows
  - [x] floating/dragging/resizing (using react-rnd)
  - [x] focus management
  - [ ] tiling
  - [ ] maximizing
  - [ ] resize indicator
- [x] Taskbar
  - [ ] Dark-mode toggle clock
  - [ ] window management
- [x] Desktop Icons
  - [ ] moving in grid
- [ ] File manager 'app'
- [ ] Multi-lang support
- [ ] Migrate to TypeScript (?)
- [ ] Make it pretty


## Using the project
If you use NixOS, simply open the folder in a terminal and run `nix-shell`. ~~It should take care of installing the exact version of node used to write the project~~ **TODO: switch to a nix flake**

Otherwise, make sure NodeJS and NPM are installed, then open the folder in a terminal and run `npm install`.

Once either of those are done, you can use `npm run dev` to open a local live development server or `npm run build` to build the project into the `dist` folder.