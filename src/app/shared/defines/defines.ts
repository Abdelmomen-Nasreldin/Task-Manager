// export const PAGE_ROUTES = {
//   DASHBOARD: 'dashboard',
//   TASKS: 'tasks',
//   ANALYTICS: 'analytics',
//   TEAM: 'team',
// };

export const PAGE_ROUTES_DATA
 = {
  DASHBOARD: {
    name: 'Dashboard',
    nameAr: 'لوحة التحكم',
    icon: 'dashboard',
    path: 'dashboard',
  },
  TASKS: {
    name: 'Tasks',
    nameAr: 'المهام',
    icon: 'tasks',
    path: 'tasks',
  },
  ANALYTICS: {
    name: 'Analytics',
    nameAr: 'التحليلات',
    icon: 'bar_chart',
    path: 'analytics',
  },
  TEAM: {
    name: 'Team',
    nameAr: 'الفريق',
    icon: 'people',
    path: 'team',
  },
} as const;
