export default function NoComponent(props: { props: any }) {
  return (
    <div className="p-4 bg-red-200 border border-red-600 m-4 overflow-auto">
      <h1>No component found</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
