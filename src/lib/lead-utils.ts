import { supabase } from "@/integrations/supabase/client";

export interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message?: string;
  source_page: string;
  source_label?: string;
  budget?: string;
}

export async function submitLead(lead: LeadSubmission): Promise<{ success: boolean; error?: string }> {
  // Validate
  if (!lead.name.trim() || !lead.email.trim()) {
    return { success: false, error: "Name and email are required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(lead.email.trim())) {
    return { success: false, error: "Invalid email address" };
  }

  const { error } = await supabase.from("leads").insert({
    name: lead.name.trim().slice(0, 100),
    email: lead.email.trim().slice(0, 255),
    phone: lead.phone?.trim().slice(0, 20) || null,
    company: lead.company?.trim().slice(0, 100) || null,
    service_interest: lead.service_interest?.trim().slice(0, 200) || null,
    message: lead.message?.trim().slice(0, 2000) || null,
    source_page: lead.source_page.slice(0, 200),
    source_label: lead.source_label?.slice(0, 200) || null,
    budget: lead.budget?.slice(0, 50) || null,
  });

  if (error) {
    console.error("Lead submission error:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
  return { success: true };
}
