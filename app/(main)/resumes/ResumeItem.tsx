"use client";

import { deleteResume } from "@/actions/resumeActions";
import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Loader2, MoreVertical, PrinterIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";

interface ResumeItemProp {
  resume: ResumeServerData;
}

const MoreMenu = ({
  resumeId,
  onPrintClick,
}: {
  resumeId: string;
  onPrintClick: () => void;
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="absolute right-0.5 top-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100"
          >
            <MoreVertical size={4} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <Trash2 size={4} />
            Delete
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-2"
            onClick={() => onPrintClick()}
          >
            <PrinterIcon size={4} />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfrimationDialog
        resumeId={resumeId}
        onOpenChange={setShowDeleteConfirmation}
        open={showDeleteConfirmation}
      />
    </>
  );
};

const DeleteConfrimationDialog = ({
  resumeId,
  onOpenChange,
  open,
}: {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.log(error);
        toast("Something went wrong", {
          description: "Please try again later..",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete resume. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={() => handleDelete()}
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-3">
                <Loader2 size={16} className="animate-spin" />
                Deleting
              </div>
            ) : (
              "Delete"
            )}
          </Button>
          <Button
            variant={"secondary"}
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ResumeItem = ({ resume }: ResumeItemProp) => {
  const wasUpdated = resume.updatedAt !== resume.createdAt;

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Your Resume",
  });

  return (
    <div className="group relative rounded-lg border border-transparent bg-secondary p-3 transition-colors hover:border-border">
      <div className="space-y-3">
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="inline-block w-full text-center"
        >
          <p className="line-clamp-1 font-semibold">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`/editor?resumeId=${resume.id}`}
          className="relative inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            classname="overflow-hidden shadow-sm transition-shadow group-hover:shadow-lg"
            contentRef={contentRef}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </Link>
      </div>
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrintFn} />
    </div>
  );
};

export default ResumeItem;
