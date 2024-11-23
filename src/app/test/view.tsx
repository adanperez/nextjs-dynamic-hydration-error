export const Comp = async () => {
  let b = true;
  if (b) {
    throw new Error('uh ohddddddd');
  }
  return <div> Hello </div>;
};
