import { renderHook } from "@testing-library/react-hooks";
import { useGetColors } from "./useGetColors";

describe("useGetColors", () => {
  test("should return lime green as a result", () => {
    const searchString = "pale lime green";
    const expectedResult = [
      {
        id: 548,
        name: "pale lime green",
        hex: "#b1ff65",
      },
    ];

    const { result } = renderHook(() => useGetColors(searchString));
    expect(result.current.filteredColors).toMatchObject(expectedResult);
  });
});
