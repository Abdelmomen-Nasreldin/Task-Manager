# Task Manager

Task Manager is a modern Angular 21 single-page application for managing team tasks with filtering, editing, and assignment workflows.

It is built with standalone Angular components, signals-based local state, and a mock data source to keep the app easy to run locally without backend setup.

## Project Overview

## Live Demo
- https://task-manager-projecttest.netlify.app/

### Main Features
- Dashboard view with task filtering by priority, status, assignee, and title
- Full task list view with edit/delete actions (only on tasks page)
- Create/edit task modal with reactive form validation
- Team view for assignee cards
- Route shell/navigation with lazy-loaded feature pages
- User feedback via SweetAlert notifications

### High-Level Architecture
- **Presentation layer**: standalone components in `src/app/features` and `src/app/shared/ui`
- **Domain models**: TypeScript interfaces in `src/app/shared/models`
- **Application state/services**: singleton services in `src/app/core/services`
- **Filtering logic**: reusable pipe in `src/app/shared/pipes/task-filter`
- **Mock data source**: JSON files under `src/assets/data`

### Architecture Decisions
- **Signals for in-memory state**  
  `TaskService` and `UserService` expose readonly signal state for predictable, synchronous UI updates.
- **Service-centric data access**  
  All task mutation/read operations pass through `TaskService`, making future backend integration easier.
- **Feature-based folder structure**  
  Core services, shared UI/utilities, and feature pages are separated by responsibility.
- **Mock-first data loading**  
  Tasks are loaded from `/assets/data/tasks.json` to enable rapid local development and demos.

### Install
```bash
npm install
```

### Run in Development
```bash
npm run start
```

Then open [http://localhost:4200](http://localhost:4200).

### Build for Production
```bash
npm run build
```

Production output is generated in `dist/`.

## Environment Configuration

This project currently does not require `.env` files to run.

### Current Configuration Approach
- Runtime data is loaded from static assets (`src/assets/data/tasks.json`)
- `TaskService` uses a base URL of `/assets/data`
- `src/app/shared/api-config/api-config.ts` exists as a placeholder for future centralized API/environment config

### Suggested Environment Extension
If backend APIs are added, create Angular environment files (for example, `src/environments/environment.ts` and `src/environments/environment.prod.ts`) and move API base URLs/toggles there.

## Available Scripts and Commands

Defined in `package.json`:

- `npm run start`  
  Runs `ng serve` with development configuration.
- `npm run build`  
  Creates a production build.
- `npm run watch`  
  Runs continuous development builds (`ng build --watch --configuration development`).
- `npm run test`  
  Runs unit tests through Angular test builder.
- `npm run ng -- <command>`  
  Access to Angular CLI commands via npm script.

Common examples:
```bash
npm run test
npm run ng -- generate component features/example/example-page
```

## Design Patterns and State Management

### Patterns Used
- **Container/presentational split**
  - Containers (for example `tasks-page`, `dashboard-page`) coordinate service calls and UI events.
  - Presentational components (for example `task-card`, `tasks-list`) render inputs and emit outputs.
- **Dependency Injection**
  - Services (`TaskService`, `UserService`, `NotifyService`) are injected where needed.
- **Unidirectional data flow**
  - Data is passed down via `input()`
  - Actions bubble up via `output()`

### State Management Approach
- Local app state is managed with Angular signals:
  - `signal()` for mutable state
  - `computed()` for derived values (`tasks`, `tasksLength`, `tasksLastUpdated`)
  - `asReadonly()` to avoid external mutation
- Data fetch is done through `HttpClient` in `TaskService`
- CRUD methods currently update state in memory and return `Observable` values (`of(...)`) for API-like ergonomics

### Routing Strategy
- Feature routes are lazy loaded using `loadComponent` in `src/app/app.routes.ts`
- Route metadata/constants are centralized in `src/app/shared/defines/defines.ts`

## Testing Strategy

### Current Coverage
- Unit test files exist for core services, pages, UI components, and pipes (`*.spec.ts`)
- Current tests primarily validate component/service instantiation ("should create")

### Test Philosophy (Current State)
- Baseline smoke coverage is present to catch major wiring/DI failures
- Structure is ready to expand into behavior-driven unit tests

### Recommended Next Tests
- `TaskService`
  - verify load, create, update, delete state transitions and metadata updates
- `TaskFilterPipe`
  - verify filter combinations (priority/status/assignee/title)
- `Modal`
  - verify form validation and emitted payloads
- Page components
  - verify interaction flows (open/close modal, edit/delete dispatch)

## Performance Optimization Techniques Used

- **Lazy-loaded routes**  
  Reduces initial bundle size by loading feature pages on demand.
- **Signals + computed values**  
  Minimizes unnecessary recomputation and keeps rendering reactive with less overhead.
- **`@for ... track task.id` in templates**  
  Reduces DOM churn for task lists by preserving identity across updates.
- **Build budgets in Angular config**  
  Size warnings/errors are configured for initial bundle and component styles.
- **Production output hashing**  
  Enables better long-term caching for static assets.

## Known Limitations

- No real backend persistence yet (CRUD is in-memory after initial JSON load)
- `analytics` page is currently a placeholder
- `api-config.ts` is empty and environment switching is not implemented
- Test suite is mostly smoke-level, with limited behavioral assertions
- Error handling is generic (no detailed server/network classification)

## Future Improvements

- Integrate a real REST/GraphQL backend for persistent task CRUD
- Add full environment configuration and central API constants
- Expand unit/integration test coverage and include CI quality gates
- Add optimistic update rollback and retry strategies for API failures
- Improve accessibility and keyboard interactions for modal/forms
- Introduce pagination/virtual scrolling for very large task lists
- Add authentication/authorization and role-based task permissions

## Tech Stack

- Angular 21 (standalone components, signals)
- TypeScript (strict mode)
- Angular Material (form controls/date picker/select)
- RxJS
- SweetAlert2
- SCSS
