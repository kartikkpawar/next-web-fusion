import { AlertCircle, InboxIcon } from "lucide-react";
import React from "react";
import CreateProjectButton from "./CreateProjectButton";
import { getUserProjects } from "@/actions/userProjects.actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDistanceToNow } from "date-fns";
// import Link from "next/link";

async function UserProjects() {
  const projects = await getUserProjects();

  if (!projects) {
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again later
      </AlertDescription>
    </Alert>;
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center mt-10">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No project created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first project
          </p>
        </div>
        <CreateProjectButton triggeredText="Create your first project" />
      </div>
    );
  }
  return (
    <div className="grid mt-10 grid-cols-3 gap-10">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
          </CardHeader>
          {project.description && (
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
          )}
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {/* By {page.author} */}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(project.createdAt, { addSuffix: true })}
            </div>
          </CardFooter>
          <CardFooter>
            {/* <Link href={`/pages/${page.id}`} className="w-full"> */}
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
              View Page
            </button>
            {/* </Link> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default UserProjects;
