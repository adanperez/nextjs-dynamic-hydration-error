import m from "next/dynamic";
const r = m(() => import("./Header.js"), {
  // loading: () => <p>Loading...</p>,
});
export {
  r as DynamicHeader
};
