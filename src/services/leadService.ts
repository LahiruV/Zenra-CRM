import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Lead, CreateLeadInput, UpdateLeadInput, LeadStats } from '../model/Lead';
import { protectedApiRequest, queryKeys } from './api';

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
    queryFn: async () => {
      const response = await protectedApiRequest.get<Lead[]>(ENDPOINTS.leads);
      return response.data;
    },
  });
};

/**
 * Hook to fetch lead statistics
 */
export const useLeadStats = () => {
  return useQuery({
    queryKey: queryKeys.leadStats,
    queryFn: async () => {
      const response = await protectedApiRequest.get<LeadStats>(ENDPOINTS.leadStats);
      return response.data;
    },
  });
};

/**
 * Hook to fetch a single lead by ID
 */
export const useLead = (id: string) => {
  return useQuery({
    queryKey: queryKeys.lead(id),
    queryFn: async () => {
      const response = await protectedApiRequest.get<Lead>(ENDPOINTS.lead(id));
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Hook to create a new lead
 */
export const useCreateLead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateLeadInput) => {
      const response = await protectedApiRequest.post<Lead>(ENDPOINTS.leads, data);
      return response.data;
    },
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
    mutationFn: async (data: UpdateLeadInput) => {
      const response = await protectedApiRequest.put<Lead>(ENDPOINTS.lead(data.id), data);
      return response.data;
    },
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
    mutationFn: async (id: string) => {
      const response = await protectedApiRequest.delete(ENDPOINTS.lead(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
      queryClient.invalidateQueries({ queryKey: queryKeys.leadStats });
    },
  });
};