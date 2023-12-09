export const loadFramerMotion = () =>
  import("./framerMotion").then((res) => res.default);
