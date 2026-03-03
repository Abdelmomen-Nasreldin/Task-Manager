import { Routes } from '@angular/router';
import { PAGE_ROUTES_DATA } from './shared/defines/defines';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard-page/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: PAGE_ROUTES_DATA.DASHBOARD.path,
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: PAGE_ROUTES_DATA.TASKS.path,
    loadComponent: () => import('./features/tasks/tasks-page/tasks-page').then((m) => m.TasksPage),
  },
  {
    path: PAGE_ROUTES_DATA.ANALYTICS.path,
    loadComponent: () =>
      import('./features/analytics/analytics-page/analytics-page').then((m) => m.AnalyticsPage),
  },
  {
    path: PAGE_ROUTES_DATA.TEAM.path,
    loadComponent: () => import('./features/team/team-page/team-page').then((m) => m.TeamPage),
  },
];
