"use client";
import { editPage } from "@/actions/userPages.action";
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
import { generateSlug, isValidSlug } from "@/lib/helper";
import {
  createPageSchema,
  createPageSchemaType,
} from "@/lib/types/forms.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { InfoIcon, Layers2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EditPageDialog({
  open,
  setOpen,
  pageTitle,
  pageSlug,
  siteId,
  pageId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  pageTitle: string;
  pageSlug: string;
  siteId: string;
  pageId: string;
}) {
  const [slugMessage, setSlugMessage] = useState("");

  const mutation = useMutation({
    mutationFn: editPage,
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

  const form = useForm<createPageSchemaType>({
    resolver: zodResolver(createPageSchema),
    defaultValues: {
      title: pageTitle || "",
      slug: pageSlug || "",
    },
  });

  const onSubmit = (values: createPageSchemaType) => {
    const newValues = { ...values };
    if (!values.slug) {
      const slug = generateSlug(values.title.trim());
      form.setValue("slug", slug);
      newValues.slug = slug;
      setSlugMessage("");
    }

    if (values.slug || newValues.slug) {
      if (!isValidSlug(values.slug || newValues.slug)) {
        setSlugMessage(
          "Slug can only contain lowecase alphabets and  hyphens (-)"
        );
      }
    }
    mutation.mutate({ siteId, formValues: newValues, pageId });
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
          title="Create page"
          subTitle="Start building your website add your first page"
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Slug{" "}
                      <p className="text-xs text-muted-foreground">
                        (optinoal)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription className="flex items-center gap-1">
                      <InfoIcon size={15} />
                      {slugMessage ||
                        "If not added will be generated automatically"}
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

export default EditPageDialog;
