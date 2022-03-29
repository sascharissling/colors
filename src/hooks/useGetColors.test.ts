import { renderHook } from "@testing-library/react-hooks";
import { useGetColors } from "./useGetColors";

const MOCK_COLORS = [
  { id: 1, name: "red", hex: "#ffffff" },
  { id: 2, name: "blue", hex: "#ffffff" },
  { id: 3, name: "grey", hex: "#ffffff" },
];

describe("useGetColors", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(MOCK_COLORS),
      } as Response)
    );
  });

  test("should return blue as a result", async () => {
    const expectedResult = [
      {
        id: 2,
        name: "blue",
        hex: "#ffffff",
      },
    ];

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetColors("blue")
    );
    await waitForNextUpdate();
    expect(result.current.filteredColors).toMatchObject(expectedResult);
  });

  test("should throw an error", async () => {
    const mockFetch = Promise.resolve({
      ok: false,
      json: () => Promise.resolve([]),
    });

    jest.spyOn(window, "fetch").mockImplementationOnce(() => mockFetch as any);

    const { result, waitForNextUpdate } = renderHook(() =>
      useGetColors("blue")
    );
    await waitForNextUpdate();
    expect(result.current.error).toBeInstanceOf(Error);
  });

  test("should be loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useGetColors("blue")
    );
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });
});
