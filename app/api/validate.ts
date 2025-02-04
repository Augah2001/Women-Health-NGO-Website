import { z } from 'zod';

// DrugInfo Schema
export const drugInfoSchema = z.object({
  startAge: z.number().nonnegative(),
  endAge: z.number().nonnegative(),
  startDate: z.string(),
  endDate: z.string(),
  gender: z.string(),
  race: z.string(),
  drugName: z.string(),
  price: z.number().nonnegative(),
  location: z.string(),
  usersCount: z.number().int().nonnegative(),
  ProvinceCode: z.string(),
});

export const peerOutreachSchema = z.object({
  theme: z.string(),
  location: z.string(),
  From: z.date(), // Converts string to Date
  To: z.date(),   // Converts string to Date
  description: z.string(),
 // Assuming images are URLs or file paths
})

export const newsSchema = z.object({
  image: z.string(), // base64 encoded image string
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  title: z.string().min(1, { message: 'Title is required' }),
  body: z.string().min(10, { message: 'Body is required' }),
});


export const researchArticleSchema = z.object({
  publicationDate: z.date(),
  author: z.string(),
  title: z.string(),
  abstract: z.string(),
  picture: z.string(),
});


// Province Schema
export const provinceSchema = z.object({
  superUserPassword: z.string(),
  name: z.string(),
  code: z.string(),
  password: z.string(),
});

// SuperUser Schema
export const superUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function validate(
    schema: z.ZodObject<any>,
    body: { [key: string | number]: any }
  ) {
    return schema.safeParse(body);
  }