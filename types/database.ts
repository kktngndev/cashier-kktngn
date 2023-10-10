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
      kategori: {
        Row: {
          created_at: string
          id: number
          nama_kategori: string
        }
        Insert: {
          created_at?: string
          id?: number
          nama_kategori?: string
        }
        Update: {
          created_at?: string
          id?: number
          nama_kategori?: string
        }
        Relationships: []
      }
      produk: {
        Row: {
          created_at: string
          harga_produk: number
          id: number
          kategori: number | null
          keterangan_produk: string | null
          nama_produk: string
        }
        Insert: {
          created_at?: string
          harga_produk?: number
          id?: number
          kategori?: number | null
          keterangan_produk?: string | null
          nama_produk?: string
        }
        Update: {
          created_at?: string
          harga_produk?: number
          id?: number
          kategori?: number | null
          keterangan_produk?: string | null
          nama_produk?: string
        }
        Relationships: [
          {
            foreignKeyName: "produk_kategori_fkey"
            columns: ["kategori"]
            referencedRelation: "kategori"
            referencedColumns: ["id"]
          }
        ]
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
