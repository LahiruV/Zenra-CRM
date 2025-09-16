import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Contact, CreateContactInput, UpdateContactInput, ContactStats } from '../model/Contact';
import { protectedApiRequest, queryKeys } from './api';

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
    queryFn: async () => {
      const response = await protectedApiRequest.get<Contact[]>(ENDPOINTS.contacts);
      return response.data;
    },
  });
};

/**
 * Hook to fetch contact statistics
 */
export const useContactStats = () => {
  return useQuery({
    queryKey: queryKeys.contactStats,
    queryFn: async () => {
      const response = await protectedApiRequest.get<ContactStats>(ENDPOINTS.contactStats);
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single contact by ID
 */
export const useContact = (id: string) => {
  return useQuery({
    queryKey: queryKeys.contact(id),
    queryFn: async () => {
      const response = await protectedApiRequest.get<Contact>(ENDPOINTS.contact(id));
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Hook to create a new contact
 */
export const useCreateContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateContactInput) => {
      const response = await protectedApiRequest.post<Contact>(ENDPOINTS.contacts, data);
      return response.data;
    },
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
    mutationFn: async (data: UpdateContactInput) => {
      const response = await protectedApiRequest.put<Contact>(ENDPOINTS.contact(data.id), data);
      return response.data;
    },
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
    mutationFn: async (id: string) => {
      const response = await protectedApiRequest.delete(ENDPOINTS.contact(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contacts });
      queryClient.invalidateQueries({ queryKey: queryKeys.contactStats });
    },
  });
};