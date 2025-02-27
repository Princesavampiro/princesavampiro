import { useQuery } from "@tanstack/react-query";
import * as sanityUtils from "../sanity/sanity-utils";

export function useConfig() {
  return useQuery({
    queryKey: ["config"],
    queryFn: sanityUtils.getConfig,
  });
}

export function useSections() {
  return useQuery({
    queryKey: ["sections"],
    queryFn: sanityUtils.getSections,
  });
}

export function useQuienSoy() {
  return useQuery({
    queryKey: ["quienSoy"],
    queryFn: sanityUtils.getQuienSoy,
  });
}

export function useReleases() {
  return useQuery({
    queryKey: ["releases"],
    queryFn: sanityUtils.getReleases,
  });
}

export function useTiposDeReleases() {
  return useQuery({
    queryKey: ["tiposDeReleases"],
    queryFn: sanityUtils.getTiposDeReleases,
  });
}

export function useLives() {
  return useQuery({
    queryKey: ["lives"],
    queryFn: sanityUtils.getLives,
  });
}

export function useExpos() {
  return useQuery({
    queryKey: ["expos"],
    queryFn: sanityUtils.getExposiciones,
  });
}

export function useInvestigacion() {
  return useQuery({
    queryKey: ["investigacion"],
    queryFn: sanityUtils.getInvestigacion,
  });
}

export function useArticulos() {
  return useQuery({
    queryKey: ["articulos"],
    queryFn: sanityUtils.getArticulo,
  });
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: sanityUtils.getBlogPosts,
  });
}

export function useItem(slug) {
  return useQuery({
    queryKey: ["item", slug],
    queryFn: () => sanityUtils.getItem(slug),
  });
}
