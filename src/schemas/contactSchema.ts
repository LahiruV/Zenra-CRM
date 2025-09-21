import { z } from 'zod';

/**
 * Contact form validation schema using Zod
 */
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),

  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .max(100, 'Email address must be less than 100 characters'),

  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = val.replace(/[\s\-\(\)]/g, '');
      return phoneRegex.test(cleanPhone);
    }, 'Please enter a valid phone number'),

  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),

  position: z
    .string()
    .max(100, 'Position must be less than 100 characters')
    .optional(),

  department: z
    .string()
    .optional(),

  status: z
    .enum(['Active', 'Inactive', 'Pending'], {
      errorMap: () => ({ message: 'Please select a valid status' })
    }),

  address: z.object({
    street: z
      .string()
      .max(200, 'Street address must be less than 200 characters')
      .optional(),
    
    city: z
      .string()
      .max(100, 'City must be less than 100 characters')
      .optional(),
    
    state: z
      .string()
      .max(50, 'State must be less than 50 characters')
      .optional(),
    
    zipCode: z
      .string()
      .optional()
      .refine((val) => {
        if (!val || val.trim() === '') return true;
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(val);
      }, 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'),
    
    country: z
      .string()
      .max(100, 'Country must be less than 100 characters')
      .optional(),
  }),

  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),

  tags: z
    .array(z.string())
    .optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Lead form validation schema
 */
export const leadSchema = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),

  contactName: z
    .string()
    .min(1, 'Contact name is required')
    .min(2, 'Contact name must be at least 2 characters')
    .max(100, 'Contact name must be less than 100 characters'),

  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address')
    .max(100, 'Email address must be less than 100 characters'),

  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = val.replace(/[\s\-\(\)]/g, '');
      return phoneRegex.test(cleanPhone);
    }, 'Please enter a valid phone number'),

  source: z
    .string()
    .min(1, 'Lead source is required')
    .max(100, 'Lead source must be less than 100 characters'),

  estimatedValue: z
    .number()
    .min(0, 'Estimated value must be a positive number')
    .max(10000000, 'Estimated value must be less than $10,000,000'),

  priority: z
    .enum(['Low', 'Medium', 'High', 'Urgent'], {
      errorMap: () => ({ message: 'Please select a valid priority' })
    }),

  expectedCloseDate: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const date = new Date(val);
      return !isNaN(date.getTime()) && date > new Date();
    }, 'Expected close date must be in the future'),

  assignedToId: z
    .string()
    .optional(),

  status: z
    .enum(['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'], {
      errorMap: () => ({ message: 'Please select a valid status' })
    })
    .optional(),

  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),

  tags: z
    .array(z.string())
    .optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;