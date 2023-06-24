export default function apiRoot(route: string): string {
  return `${process.env.NEXT_PUBLIC_API_ROOT}${route}`;
}
