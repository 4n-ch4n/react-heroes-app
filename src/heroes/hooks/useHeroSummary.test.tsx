import { beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useHeroSummary } from './useHeroSummary';
import { getSummaryAction } from '../actions/get-summary.action';
import type { PropsWithChildren } from 'react';
import type { SummaryInformationResponse } from '../types/summary-information.response';

vi.mock('../actions/get-summary.action', () => ({
  getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const tanStackCustomProvider = () => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useHeroSummary', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  test('should return the initial state (isLoading)', () => {
    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  test('should return success state with data when API call succeeds', async () => {
    const mockSummaryData = {
      totalHeroes: 10,
      strongestHero: {
        id: '1',
        name: 'Superman',
      },
      smartestHero: {
        id: '2',
        name: 'batman',
      },
      heroCount: 18,
      villainCount: 7,
    } as SummaryInformationResponse;

    mockGetSummaryAction.mockResolvedValueOnce(mockSummaryData);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  test('should return error state when API call fails', async () => {
    const mockError = new Error('Failed to fetch summary');
    mockGetSummaryAction.mockRejectedValue(mockError);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.isLoading).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
    expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);
    expect(result.current.error?.message).toBe('Failed to fetch summary');
  });
});
