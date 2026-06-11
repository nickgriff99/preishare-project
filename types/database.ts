export type AssetClass =
  | "multifamily"
  | "industrial"
  | "medical_office"
  | "retail"
  | "data_center"
  | "self_storage"
  | "office"
  | "hospitality"
  | "other";

export type ListingStatus = "draft" | "published" | "archived";
export type UserRole = "investor" | "sponsor" | "admin";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          role: UserRole;
          company_name: string | null;
          title: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          role?: UserRole;
          company_name?: string | null;
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          role?: UserRole;
          company_name?: string | null;
          title?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      sponsors: {
        Row: {
          id: string;
          name: string;
          slug: string;
          verified: boolean;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          verified?: boolean;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          verified?: boolean;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      listings: {
        Row: {
          id: string;
          slug: string;
          title: string;
          asset_class: AssetClass;
          city: string;
          state: string;
          investment_amount: number;
          target_equity: number;
          projected_irr: number;
          minimum_investment: number | null;
          description: string | null;
          status: ListingStatus;
          featured: boolean;
          sponsor_id: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          asset_class: AssetClass;
          city: string;
          state: string;
          investment_amount: number;
          target_equity: number;
          projected_irr: number;
          minimum_investment?: number | null;
          description?: string | null;
          status?: ListingStatus;
          featured?: boolean;
          sponsor_id: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          asset_class?: AssetClass;
          city?: string;
          state?: string;
          investment_amount?: number;
          target_equity?: number;
          projected_irr?: number;
          minimum_investment?: number | null;
          description?: string | null;
          status?: ListingStatus;
          featured?: boolean;
          sponsor_id?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "listings_sponsor_id_fkey";
            columns: ["sponsor_id"];
            referencedRelation: "sponsors";
            referencedColumns: ["id"];
          },
        ];
      };
      listing_media: {
        Row: {
          id: string;
          listing_id: string;
          storage_path: string | null;
          alt_text: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          storage_path?: string | null;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          storage_path?: string | null;
          alt_text?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      listing_interests: {
        Row: {
          id: string;
          listing_id: string;
          user_id: string;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          listing_id: string;
          user_id: string;
          message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          listing_id?: string;
          user_id?: string;
          message?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      listing_payments: {
        Row: {
          id: string;
          user_id: string;
          stripe_checkout_session_id: string;
          stripe_payment_intent_id: string | null;
          amount_cents: number;
          currency: string;
          status: string;
          listing_title: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_checkout_session_id: string;
          stripe_payment_intent_id?: string | null;
          amount_cents?: number;
          currency?: string;
          status?: string;
          listing_title?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_checkout_session_id?: string;
          stripe_payment_intent_id?: string | null;
          amount_cents?: number;
          currency?: string;
          status?: string;
          listing_title?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "listing_payments_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      asset_class: AssetClass;
      listing_status: ListingStatus;
      user_role: UserRole;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type Listing = Database["public"]["Tables"]["listings"]["Row"] & {
  sponsors?: Database["public"]["Tables"]["sponsors"]["Row"] | null;
};

export type Sponsor = Database["public"]["Tables"]["sponsors"]["Row"];
