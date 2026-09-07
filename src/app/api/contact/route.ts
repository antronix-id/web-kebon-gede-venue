import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = contactFormSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validasi formulir gagal",
          issues: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const { error } = await supabase.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        event_type: data.event_type || null,
        preferred_date: data.preferred_date || null,
        venue_preference: data.venue_preference || null,
        estimated_guests: data.estimated_guests || 0,
        message: data.message,
        status: "new",
      });

      if (error) {
        console.error("Error inserting contact message to Supabase:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Gagal menyimpan pesan ke database: " + error.message,
          },
          { status: 500 }
        );
      }
    } else {
      console.log("[Demo Mode] Pesan kontak diterima:", data);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pesan Anda berhasil terkirim. Tim Kebon Gede Venue akan segera menghubungi Anda!",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API internal error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan internal pada server.",
      },
      { status: 500 }
    );
  }
}
