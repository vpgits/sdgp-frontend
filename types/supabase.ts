export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          data: Json | null
          file_type: string | null
          id: string
          inserted_at: string
          summary: Json | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          data?: Json | null
          file_type?: string | null
          id?: string
          inserted_at?: string
          summary?: Json | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          data?: Json | null
          file_type?: string | null
          id?: string
          inserted_at?: string
          summary?: Json | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      embeddings: {
        Row: {
          body: string | null
          chat_instance_id: number | null
          document_id: string | null
          embedding: string | null
          id: number
        }
        Insert: {
          body?: string | null
          chat_instance_id?: number | null
          document_id?: string | null
          embedding?: string | null
          id?: number
        }
        Update: {
          body?: string | null
          chat_instance_id?: number | null
          document_id?: string | null
          embedding?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "embeddings_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          }
        ]
      }
      key_points: {
        Row: {
          created_at: string
          data: Json | null
          id: number
          quiz_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: number
          quiz_id?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: number
          quiz_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "key_points_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "key_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      notification: {
        Row: {
          created_at: string
          "description ": string | null
          id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          "description "?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          "description "?: string | null
          id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          created_at: string
          data: Json | null
          document_id: string | null
          id: number
          key_point: number | null
          quiz_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          document_id?: string | null
          id?: number
          key_point?: number | null
          quiz_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          document_id?: string | null
          id?: number
          key_point?: number | null
          quiz_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_key_point_fkey"
            columns: ["key_point"]
            isOneToOne: false
            referencedRelation: "key_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      quiz: {
        Row: {
          default_model: boolean | null
          document_id: string | null
          generating: boolean | null
          id: string
          inserted_at: string
          num_of_questions: number | null
          parent_id: string | null
          remarks: string | null
          results: Json | null
          scores: number | null
          summary: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          default_model?: boolean | null
          document_id?: string | null
          generating?: boolean | null
          id?: string
          inserted_at?: string
          num_of_questions?: number | null
          parent_id?: string | null
          remarks?: string | null
          results?: Json | null
          scores?: number | null
          summary?: Json | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          default_model?: boolean | null
          document_id?: string | null
          generating?: boolean | null
          id?: string
          inserted_at?: string
          num_of_questions?: number | null
          parent_id?: string | null
          remarks?: string | null
          results?: Json | null
          scores?: number | null
          summary?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      share: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          summary: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          summary?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          summary?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_share_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          raw_user_meta_data: Json | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          raw_user_meta_data?: Json | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          raw_user_meta_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
