export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      produk: {
        Row: {
          created_at: string
          harga_produk: number
          id: number
          keterangan_produk: string | null
          nama_produk: string
        }
        Insert: {
          created_at?: string
          harga_produk?: number
          id?: number
          keterangan_produk?: string | null
          nama_produk?: string
        }
        Update: {
          created_at?: string
          harga_produk?: number
          id?: number
          keterangan_produk?: string | null
          nama_produk?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
