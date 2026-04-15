// import { supabase } from "@/integrations/supabase/client";

// export interface LeadSubmission {
//   name: string;
//   email: string;
//   phone?: string;
//   company?: string;
//   service_interest?: string;
//   message?: string;
//   source_page: string;
//   source_label?: string;
//   budget?: string;
// }

// export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; error?: string }> {
//   // Validate
//   if (!lead.name.trim() || !lead.email.trim()) {
//     return { success: false, error: "Name and email are required" };
//   }
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(lead.email.trim())) {
//     return { success: false, error: "Invalid email address" };
//   }

//   const { error } = await supabase.from("leads").insert({
//     name: lead.name.trim().slice(0, 100),
//     email: lead.email.trim().slice(0, 255),
//     phone: lead.phone?.trim().slice(0, 20) || null,
//     company: lead.company?.trim().slice(0, 100) || null,
//     service_interest: lead.service_interest?.trim().slice(0, 200) || null,
//     message: lead.message?.trim().slice(0, 2000) || null,
//     source_page: lead.source_page.slice(0, 200),
//     source_label: lead.source_label?.slice(0, 200) || null,
//     budget: lead.budget?.slice(0, 50) || null,
//   });

//   if (error) {
//     console.error("Lead submission error:", error);
//     return { success: false, error: "Failed to submit. Please try again." };
//   }
//   return { success: true };
// }


      // "https://script.google.com/macros/s/AKfycbwi9oo88hc7p67AH2DB5HOaZyx9ZbKg7EUnH_Zliy_JuqxGjuGLUWOUE-v2BZ9HX6p5/exechttps://script.google.com/macros/s/AKfycbwi9oo88hc7p67AH2DB5HOaZyx9ZbKg7EUnH_Zliy_JuqxGjuGLUWOUE-v2BZ9HX6p5/exec",

export async function submitLead(data: any) {
  try {
    const SCRIPT_URL ="https://script.google.com/macros/s/AKfycbwo7lHIN5lEidVr7U9IZEOHh4mvGTajhP7kdgr1VUfVnGynuG3PnkEksQrC4Ov2Ex8J/exec"

    // Encode as form data — required for no-cors mode
    const formBody = new URLSearchParams(data).toString();

    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", 
      body: formBody,
    });

    // no-cors gives an opaque response — we can't read it,
    // so optimistically assume success
    return { success: true };
  } catch (error: any) {
    console.error("Lead submission error:", error);
    return { success: false, error: error.message };
  }
}