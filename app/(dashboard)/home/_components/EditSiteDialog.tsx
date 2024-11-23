"use client";
import { editSite } from "@/actions/userSites.actions";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  createSiteSchema,
  createSiteSchemaType,
} from "@/lib/types/forms.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Layers2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EditSiteDialog({
  open,
  setOpen,
  siteTitle,
  siteId,
  siteDescription,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  siteTitle: string;
  siteId: string;
  siteDescription: string | null;
}) {
  const mutation = useMutation({
    mutationFn: editSite,
    onSuccess: () => {
      toast.success("Site created successfully", { id: "create-site" });
      setOpen(false);
    },
    onError: (error: Error) => {
      console.log(error);

      toast.error(error.message || "Something went wrong", {
        id: "create-site",
      });
    },
  });

  const form = useForm<createSiteSchemaType>({
    resolver: zodResolver(createSiteSchema),
    defaultValues: {
      title: siteTitle || "",
      description: siteDescription || "",
    },
  });

  const onSubmit = (values: createSiteSchemaType) => {
    mutation.mutate({ id: siteId, formValues: values });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        form.reset();
      }}
    >
      <DialogContent>
        <CustomDialogHeader
          icon={Layers2}
          title="Edit Site"
          subTitle="Edit your site"
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
                name="title"
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
                      Provide a brief description for your site.
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

export default EditSiteDialog;
