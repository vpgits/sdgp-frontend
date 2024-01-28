"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton() {
  const { pending, data, method, action } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add Document"}
    </Button>
  );
}
