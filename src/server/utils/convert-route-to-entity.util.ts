const mapping: Record<string, string> = {
  clusters: 'cluster',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
