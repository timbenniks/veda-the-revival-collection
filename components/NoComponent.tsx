export default function NoComponent(props: {
  name: string;
  [key: string]: any;
}) {
  return (
    <div className="p-4 bg-red-200 border border-red-600 m-4 overflow-auto">
      <h1 className="text-xl mb-4">
        No component found for: <strong>{props.name}</strong>
      </h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
