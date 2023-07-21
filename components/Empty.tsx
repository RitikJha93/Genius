interface EmptyProps {
  label: string;
}
const Empty = ({ label }: EmptyProps) => {
  return <div className="h-full flex items-center justify-center p-20 flex-col">
        <div>

        </div>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
  </div>;
};
export default Empty;
