// import { Everything } from '@test/dynamic';

export default function Home() {
  let b = true;
  if (b) {
    throw new Error('uh oh');
  }

  return (
    <div>
      <h1>Home</h1>
      {/* <Everything /> */}
    </div>
  );
}
