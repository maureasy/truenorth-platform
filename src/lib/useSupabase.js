import { useState, useEffect } from 'react'
import { supabase } from './supabase'

/**
 * Generic hook to fetch data from Supabase with fallback to mock data.
 * During the transition period, if Supabase tables are empty or unreachable,
 * components will still work using the local mock data.
 */
export function useTable(tableName, { fallback = [], orderBy, filters, enabled = true } = {}) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function fetchData() {
      try {
        let query = supabase.from(tableName).select('*')

        if (orderBy) {
          query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true })
        }

        if (filters) {
          for (const [key, value] of Object.entries(filters)) {
            query = query.eq(key, value)
          }
        }

        const { data: rows, error: err } = await query

        if (cancelled) return

        if (err) {
          console.warn(`[useTable] ${tableName}: ${err.message} — using fallback`)
          setError(err)
          setData(fallback)
        } else if (rows && rows.length > 0) {
          setData(rows)
        } else {
          // Table exists but is empty — use fallback
          setData(fallback)
        }
      } catch (e) {
        if (!cancelled) {
          console.warn(`[useTable] ${tableName}: network error — using fallback`)
          setError(e)
          setData(fallback)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [tableName, enabled])

  return { data, loading, error, setData }
}

/**
 * Insert a row into a Supabase table.
 */
export async function insertRow(tableName, row) {
  const { data, error } = await supabase.from(tableName).insert(row).select()
  if (error) throw error
  return data
}

/**
 * Update a row in a Supabase table.
 */
export async function updateRow(tableName, id, updates) {
  const { data, error } = await supabase.from(tableName).update(updates).eq('id', id).select()
  if (error) throw error
  return data
}

/**
 * Delete a row from a Supabase table.
 */
export async function deleteRow(tableName, id) {
  const { error } = await supabase.from(tableName).delete().eq('id', id)
  if (error) throw error
}
