"use client";

import { ImagePlusIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState, type DragEvent } from "react";

import { cn } from "@/lib/utils";

// Phone photos are often 3–8MB. Shrinking them here keeps uploads well under the server limits,
// and the shop never shows an image wider than this anyway (next/image resizes the rest).
const MAX_EDGE_PX = 2000;
const JPEG_QUALITY = 0.85;
const ACCEPT = ["image/jpeg", "image/png", "image/webp", "image/avif"];

interface Picked {
  id: string;
  file: File;
  preview: string;
}

async function shrink(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE_PX / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // JPEG, not WebP: Safari's canvas can't encode WebP and would silently fall back to a huge PNG.
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
  );
  if (!blob || blob.size >= file.size) return file;
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

interface ImageDropzoneProps {
  /** Form field name; the files are submitted with the surrounding form. */
  name: string;
  hint: string;
}

const ImageDropzone = ({ name, hint }: ImageDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pickedRef = useRef<Picked[]>([]);
  const [picked, setPicked] = useState<Picked[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  // The <input> is what the form submits, so it always mirrors `picked`.
  const syncInput = () => {
    const input = inputRef.current;
    if (!input) return;
    const transfer = new DataTransfer();
    pickedRef.current.forEach((item) => transfer.items.add(item.file));
    input.files = transfer.files;
  };

  const update = (next: Picked[]) => {
    pickedRef.current = next;
    setPicked(next);
    syncInput();
  };

  useEffect(() => {
    // React resets the form after a failed submit; put the photos back so they aren't lost.
    const form = inputRef.current?.form;
    const onReset = () => setTimeout(syncInput);
    form?.addEventListener("reset", onReset);
    return () => {
      form?.removeEventListener("reset", onReset);
      pickedRef.current.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, []);

  const add = async (files: FileList | null) => {
    const images = Array.from(files ?? []).filter((file) => ACCEPT.includes(file.type));
    setBusy(true);
    try {
      const shrunk = await Promise.all(images.map(shrink));
      const added = shrunk.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));
      // Also runs when nothing was added, undoing the picker's replacement of input.files.
      update([...pickedRef.current, ...added]);
    } finally {
      setBusy(false);
    }
  };

  const remove = (target: Picked) => {
    URL.revokeObjectURL(target.preview);
    update(pickedRef.current.filter((item) => item.id !== target.id));
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    void add(event.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center text-sm transition-colors focus-within:ring-3 focus-within:ring-ring/50",
          dragging ? "border-primary bg-primary/5" : "border-input hover:bg-muted/50",
        )}
      >
        <ImagePlusIcon className="size-6 text-muted-foreground" aria-hidden="true" />
        <span className="font-medium">
          {busy ? "Preparing photos…" : "Drag photos here or click to choose"}
        </span>
        <span className="text-xs text-muted-foreground">{hint}</span>
        <input
          ref={inputRef}
          id={name}
          name={name}
          type="file"
          accept={ACCEPT.join(",")}
          multiple
          className="sr-only"
          onChange={(event) => void add(event.target.files)}
        />
      </label>

      {picked.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {picked.map((item) => (
            <li key={item.id} className="relative aspect-square overflow-hidden rounded-md border">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob: preview, nothing to optimize */}
              <img src={item.preview} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => remove(item)}
                aria-label={`Remove ${item.file.name}`}
                className="absolute top-1 right-1 rounded-full bg-background/90 p-1 shadow-sm hover:bg-background"
              >
                <XIcon className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageDropzone;
