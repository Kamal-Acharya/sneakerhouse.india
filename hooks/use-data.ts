"use client"

/**
 * Custom hook for loading and managing data with automatic caching
 * Provides a simple interface for component-level data fetching
 */

import { useState, useEffect, useCallback } from "react"

interface UseDataState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useData<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = [],
): UseDataState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseDataState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await fetchFn()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      })
    }
  }, [fetchFn])

  useEffect(() => {
    fetchData()
  }, dependencies)

  return {
    ...state,
    refetch: fetchData,
  }
}
