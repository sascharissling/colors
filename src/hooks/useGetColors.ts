import { useState, useEffect, useMemo } from "react";

export type ColorType = {
  id: number;
  name: string;
  hex: string;
};

export function useGetColors(filter: string) {
  const [colors, setColors] = useState<ColorType[]>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://api.sampleapis.com/csscolornames/colors`)
      .then((response) => {
        if (!response.ok) {
          console.error("Error fetching colors");
        }
        return response.json();
      })
      .then((data) =>
        setColors(
          // only return colors with an actual hex code, because random values are being pushed to the api
          data.filter((color: ColorType) => /^#[0-9A-F]{6}$/i.test(color.hex))
        )
      )
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, []);

  const filteredColors = useMemo(() => {
    return filter === ""
      ? colors
      : colors?.filter((color) => color.name.includes(filter));
  }, [filter, colors]);

  return {
    filteredColors,
    error,
    loading,
  };
}
