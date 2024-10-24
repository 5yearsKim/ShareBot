import {
  useRouter,
  useSearchParams,
  useParams,
  usePathname,
} from "next/navigation";
import * as P from "path";


export function useGroupRouter() {
  const router = useRouter();

  const { groupKey, locale } = useParams();

  function _processHref(href: string): string {
    if (groupKey) {
      href = P.join(`/g/${groupKey}`, href);
    }
    if (locale) {
      href = P.join(`/${locale}`, href);
    }
    return href;
  }

  function pushRaw(href: string): void {
    router.push(href);
  }

  function replaceRaw(href: string): void {
    router.replace(href);
  }


  function push(href: string): void {
    href = _processHref(href);
    router.push(href);
  }

  function replace(href: string ): void {
    href = _processHref(href);
    router.replace(href);
  }

  function back(): void {
    router.back();
  }

  return {
    pushRaw,
    replaceRaw,
    push,
    replace,
    back,
  };
}

export function useLocale(): string {
  const { locale } = useParams();
  return locale as string;
}

export {
  useSearchParams,
  useParams,
  usePathname,
};