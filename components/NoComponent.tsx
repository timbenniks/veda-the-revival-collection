export default function NoComponent({ props }: { props: any }) {
  return (
    <>
      <h1>No component</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}
