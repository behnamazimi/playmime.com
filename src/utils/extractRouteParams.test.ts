import extractRouteParams from "./extractRouteParams";

describe("extractRouteParams", () => {
  test("should extract parameters from a valid pathname", () => {
    const pattern = "/user/:id/:name";
    const pathname = "/user/123/john";
    const result = extractRouteParams(pattern, pathname);
    expect(result).toEqual({ id: "123", name: "john" });
  });

  test("should return undefined for missing parameters", () => {
    const pattern = "/user/:id";
    const pathname = "/user/";
    const result = extractRouteParams(pattern, pathname);
    expect(result).toEqual({ id: undefined });
  });

  test("should return an route params as undefined for non-matching pathname", () => {
    const pattern = "/user/:id";
    const pathname = "/profile/123";
    const result = extractRouteParams(pattern, pathname);
    expect(result).toEqual({
      id: undefined,
    });
  });

  test("should return undefined for missing multiple parameters", () => {
    const pattern = "/user/:id/post/:postId";
    const pathname = "/user/123/post/";
    const result = extractRouteParams(pattern, pathname);

    expect(result).toEqual({
      id: undefined,
      postId: undefined,
    });
  });

  test("should handle no parameters in pattern", () => {
    const pattern = "/user";
    const pathname = "/user";
    const result = extractRouteParams(pattern, pathname);
    expect(result).toEqual({});
  });

  test("should handle special characters in parameters", () => {
    const pattern = "/user/:id";
    const pathname = "/user/abc-123_def";
    const result = extractRouteParams(pattern, pathname);
    expect(result).toEqual({ id: "abc-123_def" });
  });

  test("should throw an error for an invalid pattern", () => {
    const pattern = "";
    const pathname = "/user/123";
    expect(() => extractRouteParams(pattern, pathname)).toThrow(
      "Invalid pattern"
    );
  });

  test("should throw an error for an invalid pathname", () => {
    const pattern = "/user/:id";
    const pathname = "/user/123?query=123";
    expect(() => extractRouteParams(pattern, pathname)).toThrow(
      "Invalid pathname"
    );
  });
});
