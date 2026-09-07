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
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: "super_admin" | "admin" | "editor";
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: "super_admin" | "admin" | "editor";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: "super_admin" | "admin" | "editor";
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      venues: {
        Row: {
          id: string;
          name: string;
          slug: string;
          short_description: string | null;
          full_description: string | null;
          venue_type: "indoor" | "outdoor" | "semi_outdoor";
          capacity_min: number;
          capacity_max: number;
          facilities: string[];
          hero_image_url: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          short_description?: string | null;
          full_description?: string | null;
          venue_type: "indoor" | "outdoor" | "semi_outdoor";
          capacity_min?: number;
          capacity_max?: number;
          facilities?: string[];
          hero_image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          short_description?: string | null;
          full_description?: string | null;
          venue_type?: "indoor" | "outdoor" | "semi_outdoor";
          capacity_min?: number;
          capacity_max?: number;
          facilities?: string[];
          hero_image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      venue_images: {
        Row: {
          id: string;
          venue_id: string;
          image_url: string;
          alt_text: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          venue_id: string;
          image_url: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string;
          image_url?: string;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "venue_images_venue_id_fkey";
            columns: ["venue_id"];
            isOneToOne: false;
            referencedRelation: "venues";
            referencedColumns: ["id"];
          }
        ];
      };
      gallery_items: {
        Row: {
          id: string;
          image_url: string;
          title: string | null;
          description: string | null;
          category: "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";
          venue_id: string | null;
          is_featured: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          title?: string | null;
          description?: string | null;
          category: "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";
          venue_id?: string | null;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          title?: string | null;
          description?: string | null;
          category?: "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";
          venue_id?: string | null;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gallery_items_venue_id_fkey";
            columns: ["venue_id"];
            isOneToOne: false;
            referencedRelation: "venues";
            referencedColumns: ["id"];
          }
        ];
      };
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          content: string | null;
          cover_image_url: string | null;
          event_date: string | null;
          event_type: "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";
          venue_id: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          content?: string | null;
          cover_image_url?: string | null;
          event_date?: string | null;
          event_type: "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";
          venue_id?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          content?: string | null;
          cover_image_url?: string | null;
          event_date?: string | null;
          event_type?: "wedding" | "meeting" | "outbound" | "graduation" | "corporate" | "other";
          venue_id?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_venue_id_fkey";
            columns: ["venue_id"];
            isOneToOne: false;
            referencedRelation: "venues";
            referencedColumns: ["id"];
          }
        ];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string | null;
          cover_image_url: string | null;
          author_name: string | null;
          author_id: string | null;
          status: "draft" | "published" | "archived";
          tags: string[];
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content?: string | null;
          cover_image_url?: string | null;
          author_name?: string | null;
          author_id?: string | null;
          status?: "draft" | "published" | "archived";
          tags?: string[];
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string | null;
          cover_image_url?: string | null;
          author_name?: string | null;
          author_id?: string | null;
          status?: "draft" | "published" | "archived";
          tags?: string[];
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          client_title: string | null;
          content: string;
          rating: number;
          avatar_url: string | null;
          event_type: string | null;
          is_featured: boolean;
          is_approved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_title?: string | null;
          content: string;
          rating?: number;
          avatar_url?: string | null;
          event_type?: string | null;
          is_featured?: boolean;
          is_approved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_title?: string | null;
          content?: string;
          rating?: number;
          avatar_url?: string | null;
          event_type?: string | null;
          is_featured?: boolean;
          is_approved?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          event_type: string | null;
          preferred_date: string | null;
          venue_preference: string | null;
          estimated_guests: number | null;
          message: string;
          status: "new" | "read" | "responded" | "archived";
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          event_type?: string | null;
          preferred_date?: string | null;
          venue_preference?: string | null;
          estimated_guests?: number | null;
          message: string;
          status?: "new" | "read" | "responded" | "archived";
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          event_type?: string | null;
          preferred_date?: string | null;
          venue_preference?: string | null;
          estimated_guests?: number | null;
          message?: string;
          status?: "new" | "read" | "responded" | "archived";
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          category?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          type: "text" | "number" | "boolean" | "json" | "image";
          group_name: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: string | null;
          type?: "text" | "number" | "boolean" | "json" | "image";
          group_name?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string | null;
          type?: "text" | "number" | "boolean" | "json" | "image";
          group_name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      hero_slides: {
        Row: {
          id: string;
          image_url: string;
          title: string | null;
          subtitle: string | null;
          cta_text: string | null;
          cta_link: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          title?: string | null;
          subtitle?: string | null;
          cta_text?: string | null;
          cta_link?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          title?: string | null;
          subtitle?: string | null;
          cta_text?: string | null;
          cta_link?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
