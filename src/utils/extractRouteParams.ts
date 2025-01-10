/**
 * Extracts parameters from a Next.js route pattern and pathname.
 *
 * @param pattern - The route pattern with parameters (e.g., "/user/:id").
 * @param pathname - The pathname to extract parameters from (e.g., "/user/123").
 *
 * @returns An object with parameter names as keys and their values (e.g., { id: "123" }).
 *
 * @example
 * extractRouteParams("/user/:id", "/user/123"); // { id: "123" }
 * extractRouteParams("/user/:id", "/user/"); // { id: undefined }
 */
export default function extractRouteParams(
  pattern: string,
  pathname: string
): Record<string, string | undefined> {
  if (!pattern) {
    throw new Error("Invalid pattern: must be a non-empty string.");
  }

  if (!pathname || pathname.includes("?")) {
    throw new Error(
      "Invalid pathname: must be a non-empty string without query parameters."
    );
  }

  const escapedPattern = pattern.replace(/(:\w+)/g, "([^/]+)");
  const regex = new RegExp(`^${escapedPattern}$`);

  // Extract parameter names from the pattern
  const paramNames = [...pattern.matchAll(/:(\w+)/g)].map((match) => match[1]);

  // Initialize parameters with `undefined` values
  const params: Record<string, string | undefined> = Object.fromEntries(
    paramNames.map((name) => [name, undefined])
  );

  // Match the pathname against the generated regex
  const match = pathname.match(regex);
  if (match) {
    paramNames.forEach((name, index) => {
      params[name] = match[index + 1] || undefined;
    });
  }

  return params;
}
