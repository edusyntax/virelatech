import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ArrowLeft, Mail, Building, MapPin, Calendar, Globe, MessageSquare, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const STATUSES = ["new", "contacted", "qualified", "converted", "closed"] as const;

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  contacted: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  qualified: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  converted: "bg-green-500/10 text-green-500 border-green-500/30",
  closed: "bg-muted text-muted-foreground border-border",
};

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState("");
  const [notesLoaded, setNotesLoaded] = useState(false);

  const { data: lead, isLoading } = useQuery({
    queryKey: ["admin-lead", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
  });

  // Load notes once
  if (lead && !notesLoaded) {
    setNotes(lead.notes ?? "");
    setNotesLoaded(true);
  }

  const updateLead = useMutation({
    mutationFn: async (updates: Record<string, any>) => {
      const { error } = await supabase.from("leads").update(updates).eq("id", id!);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-lead", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      toast.success("Lead updated");
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Lead not found</p>
        <Link to="/admin/leads" className="text-accent hover:underline text-sm mt-2 inline-block">← Back to leads</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/leads")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{lead.name}</h1>
            <p className="text-sm text-muted-foreground">{lead.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => updateLead.mutate({ status: s })}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                lead.status === s
                  ? STATUS_COLORS[s]
                  : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Details */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a href={`mailto:${lead.email}`} className="text-sm text-foreground hover:text-accent transition-colors">{lead.email}</a>
                </div>
              </div>
              {lead.company && (
                <div className="flex items-start gap-3">
                  <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm text-foreground">{lead.company}</p>
                  </div>
                </div>
              )}
              {lead.service_interest && (
                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Service Interest</p>
                    <p className="text-sm text-foreground">{lead.service_interest}</p>
                  </div>
                </div>
              )}
              {lead.budget && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-sm text-foreground">{lead.budget}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Message</h2>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
            </div>
          )}

          {/* Admin Notes */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Admin Notes</h2>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this lead..."
              rows={4}
            />
            <Button
              size="sm"
              onClick={() => updateLead.mutate({ notes })}
              disabled={updateLead.isPending}
            >
              <Save className="h-3.5 w-3.5 mr-1.5" /> Save Notes
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Lead Info</h2>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <span className={`inline-block mt-1 text-xs px-3 py-1 rounded-full font-medium uppercase tracking-wider ${STATUS_COLORS[lead.status]}`}>
                  {lead.status}
                </span>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Source Page</p>
                <p className="text-sm text-foreground mt-0.5">{lead.source_page}</p>
              </div>

              {lead.source_label && (
                <div>
                  <p className="text-xs text-muted-foreground">Source Label</p>
                  <p className="text-sm text-foreground mt-0.5">{lead.source_label}</p>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="text-sm text-foreground">{format(new Date(lead.created_at), "MMMM d, yyyy")}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(lead.created_at), "h:mm a")}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm text-foreground">{format(new Date(lead.updated_at), "MMMM d, yyyy 'at' h:mm a")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
            <a
              href={`mailto:${lead.email}?subject=Re: Your inquiry at VirelaTech`}
              className="flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <Mail className="h-4 w-4" /> Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
