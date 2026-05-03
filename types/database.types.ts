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
      shows: {
        Row: {
          id: string
          title: string
          date: string
          time: string | null
          location: string | null
          setlist: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          date: string
          time?: string | null
          location?: string | null
          setlist?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          date?: string
          time?: string | null
          location?: string | null
          setlist?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}