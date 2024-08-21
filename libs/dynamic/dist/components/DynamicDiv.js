import i from "next/dynamic";
const o = i(() => import("./Div.js"), {
  // loading: () => <p>Loading...</p>,
});
export {
  o as DynamicDiv
};
