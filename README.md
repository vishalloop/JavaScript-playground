# JavaScript Playground

A collection of hands-on JavaScript projects built with HTML, CSS, and vanilla JavaScript. Each project focuses on a different browser API or front-end concept, from game loops and local storage to drag-and-drop, canvas rendering, API calls, and interactive UI state.

## Projects

| Project | Description | Key Concepts |
| --- | --- | --- |
| [Snake Game](./Snake_Game) | A classic grid-based snake game with score tracking, timer, game-over modal, and persistent high score. | DOM manipulation, timers, keyboard events, localStorage, collision logic |
| [Productivity Dashboard](./Productivity_Dashboard) | A multi-feature dashboard with tasks, day planning, motivation quotes, weather, themes, and a Pomodoro timer. | localStorage, geolocation, fetch APIs, dynamic rendering, theme variables |
| [Kanban Board](./Kanban_Board) | A drag-and-drop task board with Todo, In Progress, and Done columns plus saved tasks. | HTML drag-and-drop, modal forms, localStorage, dynamic task creation |
| [Image Editor](./Image_Editor) | A browser-based image editor using canvas filters, presets, reset, and PNG download. | Canvas API, file input, image processing, CSS filters, downloads |

## Repository Structure

```text
HTML_CSS_JS/
+-- Snake_Game/
+-- Productivity_Dashboard/
+-- Kanban_Board/
+-- Image_Editor/
+-- README.md
```

Each project is self-contained. You can open the project's `index.html` file directly in a browser. No build step or package installation is required.

## How To Run

1. Clone or download this repository.
2. Open any project folder.
3. Double-click `index.html`, or open it from your browser.

For projects that use browser permissions or remote APIs, such as the Productivity Dashboard weather feature, running through a local server can be smoother:

```bash
npx serve .
```

Then open the shown local URL and navigate to the project folder.

## Highlights

- Pure frontend projects with no framework dependency.
- Multiple browser APIs explored in practical ways.
- Screenshots included for quick previews.
- Persistent data in the browser through `localStorage`.
- A good progression from simple DOM interactions to richer app-like interfaces.

## Author

Built by Vishal Raj as a JavaScript learning playground.
