"use client";
import { createUserProject } from "@/actions/userProjects.actions";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createProjectSchema,
  createProjectSchemaType,
} from "@/lib/types/forms.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Layers2, Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreateProjectButton({ triggeredText }: { triggeredText?: string }) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: createUserProject,
    onSuccess: () => {
      toast.success("Project created successfully", { id: "create-project" });
      setOpen(false);
    },
    onError: (error: Error) => {
      console.log(error.message);

      toast.error(error.message || "Something went wrong", {
        id: "create-project",
      });
    },
  });

  const form = useForm<createProjectSchemaType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: createProjectSchemaType) => {
    mutation.mutate(values);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger>
        <Button className="font-semibold">
          <PlusIcon />
          {triggeredText || "Create Project"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CustomDialogHeader
          icon={Layers2}
          title="Create Project"
          subTitle="Start building your website"
          subtitleClassname="font-normal"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and a unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description{" "}
                      <p className="text-xs text-muted-foreground">
                        (optinoal)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of what your workflow does.
                      <br /> This is optional but can help you remember the
                      workflow&apos;s purpose
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {!mutation.isPending ? (
                  "Proceed"
                ) : (
                  <Loader2 className="animate-spin" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectButton;
