import { useEffect, useState } from "react";
import { useSections } from "../hooks/useData";
import { useLocation } from "react-router";

export function useCurrentSection() {
  const { data, isLoading, error } = useSections();
  const [currentSection, setCurrentSection] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (data) {
      const pathname = location.pathname.split("/")[1];
      const foundSection = data.find(
        (section) => section.slug.current === pathname,
      );
      setCurrentSection(foundSection || null);
    }
  }, [location.pathname, data]);

  return { currentSection, isLoading, error };
}
