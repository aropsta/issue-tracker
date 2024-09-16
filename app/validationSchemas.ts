import { z } from "zod";

//Schema for when creating issues. Require title and description
export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

//Schema for when updating issues. all fields are optional
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "'Assigned to' UserID is required")
    .max(255)
    .optional()
    .nullable(),
});
