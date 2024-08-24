import { useRef, useEffect } from "react";

type Props = {
  dataKey: string;
};

export const useColumnsObserver = ({ dataKey }: Props) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const resizedElement = entry.target;
        const index = refs.current.indexOf(resizedElement as HTMLDivElement);

        if (index !== -1) {
          const key = entry.target.getAttribute(dataKey);
          console.log(`${key} was resized to ${entry.contentRect.width}`);
        }
      });
    });

    const currentRefs = refs.current;

    currentRefs.forEach((ref) => {
      if (!ref) return;
      observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [dataKey]);

  return refs;
};
