import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();

    const repair_type = formData.get("repair_type") as string;
    const description = formData.get("description") as string;
    const city = formData.get("city") as string;
    const address = formData.get("address") as string;
    const preferred_date = formData.get("preferred_date") as string;
    const preferred_time = formData.get("preferred_time") as string;
    const client_name = formData.get("client_name") as string;
    const client_phone = formData.get("client_phone") as string;
    const photoFile = formData.get("photo") as File | null;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let photo_url: string | null = null;

    if (photoFile && photoFile.size > 0) {
      const ext = photoFile.name?.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${ext}`;

      const arrayBuffer = await photoFile.arrayBuffer();
      const fileBuffer = new Uint8Array(arrayBuffer);

      const { error: uploadError } = await supabase.storage
        .from("gofix-photos")
        .upload(fileName, fileBuffer, {
          contentType: photoFile.type || "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      const { data: urlData } = supabase.storage
        .from("gofix-photos")
        .getPublicUrl(fileName);

      photo_url = urlData.publicUrl;
    }

    // Save request to database
    const { error: insertError } = await supabase
      .from("gofix_requests")
      .insert({
        repair_type,
        description,
        city,
        address,
        preferred_date,
        preferred_time,
        client_name,
        client_phone,
        photo_url,
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      // Don't fail — photo URL is the priority
    }

    return new Response(
      JSON.stringify({ photo_url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
