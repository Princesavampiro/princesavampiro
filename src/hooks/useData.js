import { useQuery } from "@tanstack/react-query";
import * as sanityUtils from "../sanity/sanity-utils";

export function useSections() {
  return useQuery({
    queryKey: ["sections"],
    queryFn: sanityUtils.getSections,
  });
}
