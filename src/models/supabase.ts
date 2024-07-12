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
      addresses: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          landmark: string | null
          phone_number: string | null
          postal_code: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          landmark?: string | null
          phone_number?: string | null
          postal_code?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          landmark?: string | null
          phone_number?: string | null
          postal_code?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_addresses_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      advertisements: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          image_url: string | null
          link: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          link?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      billing_details: {
        Row: {
          billing_address_id: string | null
          created_at: string | null
          id: string
          payment_method: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          billing_address_id?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          billing_address_id?: string | null
          created_at?: string | null
          id?: string
          payment_method?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_details_billing_address_id_fkey"
            columns: ["billing_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart: {
        Row: {
          created_at: string | null
          id: string
          total: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          total?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          total?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_cart_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_item: {
        Row: {
          cart_id: string | null
          created_at: string | null
          id: string
          product_id: string | null
          products_sku_id: string | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          cart_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          products_sku_id?: string | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          cart_id?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          products_sku_id?: string | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_cart_item_cart_id"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_cart_item_product_id"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_cart_item_products_sku_id"
            columns: ["products_sku_id"]
            isOneToOne: false
            referencedRelation: "products_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_notifications_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          price: number | null
          product_id: string | null
          products_sku_id: string | null
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          products_sku_id?: string | null
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          products_sku_id?: string | null
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_order_item_order_id"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_order_item_product_id"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_order_item_products_sku_id"
            columns: ["products_sku_id"]
            isOneToOne: false
            referencedRelation: "products_skus"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          payment_id: string | null
          status: string | null
          total: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payment_id?: string | null
          status?: string | null
          total: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payment_id?: string | null
          status?: string | null
          total?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_orders_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_details: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          order_id: string | null
          provider: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          provider?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          order_id?: string | null
          provider?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_payment_details_order_id"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      preferences: {
        Row: {
          created_at: string | null
          dark_mode: boolean | null
          email_updates: boolean | null
          id: string
          sms_notifications: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          dark_mode?: boolean | null
          email_updates?: boolean | null
          id?: string
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          dark_mode?: boolean | null
          email_updates?: boolean | null
          id?: string
          sms_notifications?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attributes: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          type: Database["public"]["Enums"]["product_attribute_type"] | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          type?: Database["public"]["Enums"]["product_attribute_type"] | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          type?: Database["public"]["Enums"]["product_attribute_type"] | null
          value?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          cover: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          cover?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          cover?: string | null
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_products_category_id"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products_skus: {
        Row: {
          color_attribute_id: string | null
          created_at: string | null
          deleted_at: string | null
          id: string
          price: number | null
          product_id: string | null
          quantity: number | null
          size_attribute_id: string | null
          sku: string | null
          updated_at: string | null
        }
        Insert: {
          color_attribute_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          size_attribute_id?: string | null
          sku?: string | null
          updated_at?: string | null
        }
        Update: {
          color_attribute_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          size_attribute_id?: string | null
          sku?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_products_skus_color_attribute_id"
            columns: ["color_attribute_id"]
            isOneToOne: false
            referencedRelation: "product_attributes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_products_skus_product_id"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_products_skus_size_attribute_id"
            columns: ["size_attribute_id"]
            isOneToOne: false
            referencedRelation: "product_attributes"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          product_id: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_reviews_product_id"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_reviews_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_categories: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sub_categories_parent_id"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          birth_of_date: string | null
          created_at: string | null
          deleted_at: string | null
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          password: string
          phone_number: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar?: string | null
          birth_of_date?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password: string
          phone_number?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar?: string | null
          birth_of_date?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string
          phone_number?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          base_url: string
          created_at: string
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          base_url: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          base_url?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_wishlist_product_id"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_wishlist_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
      product_attribute_type: "color" | "size"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
