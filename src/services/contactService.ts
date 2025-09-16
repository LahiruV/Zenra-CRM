import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact, CreateContactInput, UpdateContactInput, ContactStats } from '../model/Contact';
import { apiRequest, queryKeys } from './api';

/**
 * Contact service for API interactions
 * Handles all contact-related API calls using TanStack Query
 */

// API endpoints
const ENDPOINTS = {
  contacts: '/contacts',
  contactStats: '/contacts/stats',
  contact: (id: string) => `/contacts/${id}`,
} as const;

/**
 * Hook to fetch all contacts
 */
export const useContacts = () => {
  return useQuery({
    queryKey: queryKeys.contacts,
    queryFn: () => apiRequest<Contact[]>(ENDPOINTS.contacts),
  });
};

/**
 * Hook to fetch contact statistics
 */
export const useContactStats = () => {
  return useQuery({
    queryKey: queryKeys.contactStats,
    queryFn: () => apiRequest<ContactStats>(ENDPOINTS.contactStats),
  });
};

/**
 * Hook to fetch a single contact by ID
 */
export const useContact = (id: string) => {
  return useQuery({
    queryKey: queryKeys.contact(id),
    queryFn: () => apiRequest<Contact>(ENDPOINTS.contact(id)),
    enabled: !!id,
  });
};

/**
 * Hook to create a new contact
 */
export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateContactInput) =>
      apiRequest<Contact>(ENDPOINTS.contacts, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
      queryClient.invalidateQueries({ queryKey: queryKeys.contactStats });
    },
  });
};

/**
 * Hook to update a contact
 */
export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateContactInput) =>
      apiRequest<Contact>(ENDPOINTS.contact(data.id), {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
      queryClient.invalidateQueries({ queryKey: queryKeys.contact(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.contactStats });
    },
  });
};

/**
 * Hook to delete a contact
 */
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(ENDPOINTS.contact(id), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
      queryClient.invalidateQueries({ queryKey: queryKeys.contactStats });
    },
  });
};