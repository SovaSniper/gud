export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      category: {
        Row: {
          consumable: boolean
          id: number
          name: string
        }
        Insert: {
          consumable?: boolean
          id?: number
          name: string
        }
        Update: {
          consumable?: boolean
          id?: number
          name?: string
        }
        Relationships: []
      }
      items: {
        Row: {
          category: string | null
          condition: string
          createdAt: string
          description: string | null
          id: number
          isDraft: boolean
          licenseRequired: boolean
          name: string
          updatedAt: string | null
          userId: string
        }
        Insert: {
          category?: string | null
          condition: string
          createdAt?: string
          description?: string | null
          id?: number
          isDraft?: boolean
          licenseRequired?: boolean
          name: string
          updatedAt?: string | null
          userId?: string
        }
        Update: {
          category?: string | null
          condition?: string
          createdAt?: string
          description?: string | null
          id?: number
          isDraft?: boolean
          licenseRequired?: boolean
          name?: string
          updatedAt?: string | null
          userId?: string
        }
        Relationships: []
      }
      listing: {
        Row: {
          createdAt: string
          description: string | null
          id: number
          itemsId: number
          locationId: number
          title: string
          updatedAt: string | null
          userId: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          id?: number
          itemsId: number
          locationId: number
          title: string
          updatedAt?: string | null
          userId?: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          id?: number
          itemsId?: number
          locationId?: number
          title?: string
          updatedAt?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_itemsId_fkey"
            columns: ["itemsId"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_locationId_fkey"
            columns: ["locationId"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["uuid"]
          },
        ]
      }
      listingCategory: {
        Row: {
          categoryId: number | null
          id: number
          listingId: number | null
        }
        Insert: {
          categoryId?: number | null
          id?: number
          listingId?: number | null
        }
        Update: {
          categoryId?: number | null
          id?: number
          listingId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "listingCategory_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listingCategory_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category_usage_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listingCategory_listingId_fkey"
            columns: ["listingId"]
            isOneToOne: false
            referencedRelation: "listing"
            referencedColumns: ["id"]
          },
        ]
      }
      location: {
        Row: {
          data: Json | null
          id: number
          placeId: string
        }
        Insert: {
          data?: Json | null
          id?: number
          placeId: string
        }
        Update: {
          data?: Json | null
          id?: number
          placeId?: string
        }
        Relationships: []
      }
      user: {
        Row: {
          createdAt: string | null
          email: string
          firstname: string | null
          lastname: string | null
          locationId: number | null
          onboarded: boolean | null
          profileURL: string | null
          updateAt: string | null
          uuid: string
        }
        Insert: {
          createdAt?: string | null
          email: string
          firstname?: string | null
          lastname?: string | null
          locationId?: number | null
          onboarded?: boolean | null
          profileURL?: string | null
          updateAt?: string | null
          uuid: string
        }
        Update: {
          createdAt?: string | null
          email?: string
          firstname?: string | null
          lastname?: string | null
          locationId?: number | null
          onboarded?: boolean | null
          profileURL?: string | null
          updateAt?: string | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_locationId_fkey"
            columns: ["locationId"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      category_usage_view: {
        Row: {
          count: number | null
          id: number | null
          name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_full_listing: {
        Args: {
          p_location: Json
          p_place_id: string
          p_item_id: number
          p_title: string
          p_description: string
          p_category_ids: number[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
