/**
 * Context provider for global data state
 * Allows sharing loaded data across the application
 */

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { loadCategories, loadSneakers } from "@/lib/data-loader"

interface DataContextType {
  categories: any[]
  sneakers: any[]
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<any[]>([])
  const [sneakers, setSneakers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const loadData = async () => {
    setLoading(true)
    setError(null)

    try {
      const [categoriesData, sneakersData] = await Promise.all([loadCategories(), loadSneakers()])

      setCategories(categoriesData.categories)
      setSneakers(sneakersData.sneakers)
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      console.error("Error loading data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <DataContext.Provider
      value={{
        categories,
        sneakers,
        loading,
        error,
        refetch: loadData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useAppData must be used within DataProvider")
  }
  return context
}
