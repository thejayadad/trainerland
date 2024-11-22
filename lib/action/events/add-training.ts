'use server';

import { authUser } from '@/lib/hooks';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Updated schema to validate `color` as a string
const trainingSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  color: z.string().min(1, 'Color is required'), // Updated: Validate as a string
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  active: z.boolean().optional().default(true),
});

export async function createTraining(formData: FormData) {
  try {
    if (!formData) {
      throw new Error('Form data is missing.');
    }

    const session = await authUser();
    if (!session?.user?.email) {
      throw new Error('You must be logged in to create a training.');
    }

    const formObject = Object.fromEntries(formData.entries());
    console.log('Received form data:', formObject);

    // Parse the form data using Zod
    const parsedData = trainingSchema.safeParse({
      title: formObject.title,
      duration: parseInt(formObject.duration as string, 10),
      description: formObject.description,
      category: formObject.category,
      color: formObject.color, // Now accepts a string
      active: formObject.active === 'true',
    });

    if (!parsedData.success) {
      console.error('Validation Error:', parsedData.error.flatten());
      throw new Error(
        `Validation error: ${JSON.stringify(parsedData.error.flatten().fieldErrors)}`
      );
    }

    const { title, duration, description, category, active, color } = parsedData.data;

    // Create the training in the database
    await prisma.trainer.create({
      data: {
        title,
        duration,
        description,
        category,
        active,
        color,
        userEmail: session.user.email,
      },
    });

    console.log('Training created successfully.');
    return { status: 'success', message: 'Training created successfully!' };
  } catch (error) {
    console.log('Error creating training:' + error);
    // throw new Error('Failed to create training. Please check your inputs and try again.');
  }
  revalidatePath('/dashboard');
  redirect("/dashboard")

}
