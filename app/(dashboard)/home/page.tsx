import CreateProjectButton from "./_components/CreateProjectButton";

export default function DashboardHome() {
  return (
    <div className="pt-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Projects</h1>
          <span className="text-muted-foreground">Manage your projects</span>
        </div>
        <CreateProjectButton />
      </div>
    </div>
  );
}
