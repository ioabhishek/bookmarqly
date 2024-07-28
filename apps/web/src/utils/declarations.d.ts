declare module "favicon-fetcher" {
  export function getFavicon(url: string): Promise<string>
}
