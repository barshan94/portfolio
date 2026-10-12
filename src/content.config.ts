import { defineCollection, z } from "astro:content";

const projectSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  tags: z.array(z.string()).default([]),
  repo: z.string().url("repo must be a valid URL").optional(),
  live: z.string().url("live must be a valid URL").optional(),
  status: z.enum(["completed", "in-progress"]).default("completed"),
  featured: z.boolean().default(false),
  accent: z.enum(["default", "accent", "accent-2"]).default("default"),
});

const cvSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  role: z.string().min(1),
  education: z.array(z.object({
    degree: z.string().min(1),
    institution: z.string().min(1),
    cgpa: z.string().optional(),
    duration: z.string().optional(),
  })),
  experience: z.array(z.object({
    type: z.string().min(1),
    role: z.string().min(1),
    org: z.string().min(1),
    location: z.string().optional(),
    period: z.string().min(1),
    bullets: z.array(z.string()).default([]),
  })),
  skills: z.array(z.object({
    group: z.string().min(1),
    items: z.array(z.string()).default([]),
  })),
  contact: z.object({
    email: z.string().email("email must be valid").optional(),
    github: z.string().url("github must be a valid URL").optional(),
    linkedin: z.string().url("linkedin must be a valid URL").optional(),
  }),
});

const writingSchema = z.object({
  title: z.string().min(1, "title is required"),
  type: z.enum(["Research Paper", "Project", "Article", "Talk"]).default("Article"),
  excerpt: z.string().min(1, "excerpt is required"),
  link: z.string().url("link must be a valid URL").optional(),
});

export const collections = {
  projects: defineCollection({
    pattern: "src/content/projects/*.md",
    schema: projectSchema,
  }),
  cv: defineCollection({
    pattern: "src/content/cv/*.md",
    schema: cvSchema,
  }),
  writing: defineCollection({
    pattern: "src/content/writing/*.md",
    schema: writingSchema,
  }),
};