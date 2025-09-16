import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead, CreateLeadInput, UpdateLeadInput, LeadStats } from '../model/Lead';
import { apiRequest, queryKeys } from './api';

/**
 * Lead service for API interactions
 * Handles all lead-related API calls using TanStack Query
 */

// API endpoints
const ENDPOINTS = {
  leads: '/leads',
  leadStats: '/leads/stats',
  lead: (id: string) => `/leads/${id}`,
} as const;

/**
 * Hook to fetch all leads
 */
export const useLeads = () => {
  return useQuery({
    queryKey: queryKeys.leads,
    queryFn: () => apiRequest<Lead[]>(ENDPOINTS.leads),
  });
};

/**
 * Hook to fetch lead statistics
 */
export const useLeadStats = () => {
  return useQuery({
    queryKey: queryKeys.leadStats,
    queryFn: () => apiRequest<LeadStats>(ENDPOINTS.leadStats),
  });
};

/**
 * Hook to fetch a single lead by ID
 */
export const useLead = (id: string) => {
  return useQuery({
    queryKey: queryKeys.lead(id),
    queryFn: () => apiRequest<Lead>(ENDPOINTS.lead(id)),
    enabled: !!id,
  });
};

/**
 * Hook to create a new lead
 */
export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateLeadInput) =>
      apiRequest<Lead>(ENDPOINTS.leads, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
      queryClient.invalidateQueries({ queryKey: queryKeys.leadStats });
    },
  });
};

/**
 * Hook to update a lead
 */
export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateLeadInput) =>
      apiRequest<Lead>(ENDPOINTS.lead(data.id), {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
      queryClient.invalidateQueries({ queryKey: queryKeys.lead(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.leadStats });
    },
  });
};

/**
 * Hook to delete a lead
 */
export const useDeleteLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) =>
      apiRequest(ENDPOINTS.lead(id), { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
      queryClient.invalidateQueries({ queryKey: queryKeys.leadStats });
    },
  });
};