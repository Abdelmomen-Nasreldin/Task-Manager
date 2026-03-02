import { Routes } from '@angular/router';
import { PAGE_ROUTES } from './shared/defines/defines';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: PAGE_ROUTES.DASHBOARD,
    redirectTo: '',
  },
  {
    path: PAGE_ROUTES.TASKS,
    loadComponent: () => import('./features/tasks/tasks-page/tasks-page').then((m) => m.TasksPage),
  },
  {
    path: PAGE_ROUTES.ANALYTICS,
    loadComponent: () =>
      import('./features/analytics/analytics-page/analytics-page').then((m) => m.AnalyticsPage),
  },
  {
    path: PAGE_ROUTES.TEAM,
    loadComponent: () => import('./features/team/team-page/team-page').then((m) => m.TeamPage),
  },
];
