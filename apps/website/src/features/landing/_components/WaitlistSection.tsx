"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Loader2, Mail, User, Building2, Target, MessageSquare } from "lucide-react";
import { Button } from "@leadflow/ui";
import { submitWaitlistAction } from "../../../app/actions/subscribe";

export function WaitlistSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    purpose: "Shopify Store Lead Generation",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await submitWaitlistAction(formData);

      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.message || "Failed to submit. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="early-access"
      className="w-full py-24 bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 text-white relative overflow-hidden flex flex-col items-center px-6"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full text-center mb-12 relative z-10 select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Priority Beta Access</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Get Early Access &amp; Shape the Product
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Be among the first to unlock high-intent Shopify dataset insights. Join our exclusive waitlist for priority onboarding.
        </p>
      </div>

      <div className="max-w-xl w-full bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(99,102,241,0.15)] relative z-10">
        {submitted ? (
          <div className="text-center py-10 select-none animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">You&apos;re on the Early Access List!</h3>
            <p className="text-slate-300 mt-3 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for signing up, <span className="font-semibold text-indigo-300">{formData.name}</span>. We&apos;ve sent a confirmation email to <span className="underline decoration-indigo-400/50">{formData.email}</span>.
            </p>
            <div className="mt-8 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200 text-left">
              💡 <strong>What happens next?</strong> We are rolling out access in small batches. We&apos;ll notify you immediately when your priority invite is ready.
            </div>
            <Button
              variant="outline"
              className="mt-8 text-sm border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  organisation: "",
                  purpose: "Shopify Store Lead Generation",
                  message: "",
                });
              }}
            >
              Submit another response
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="waitlist-name" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Full Name <span className="text-indigo-400">*</span></span>
                </label>
                <input
                  type="text"
                  id="waitlist-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Morgan"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="waitlist-email" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Work Email <span className="text-indigo-400">*</span></span>
                </label>
                <input
                  type="email"
                  id="waitlist-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Organisation */}
            <div>
              <label htmlFor="waitlist-organisation" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Organisation <span className="text-slate-500 font-normal">(Optional)</span></span>
              </label>
              <input
                type="text"
                id="waitlist-organisation"
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                placeholder="Acme Growth Agency"
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all duration-200"
              />
            </div>

            {/* Primary Purpose */}
            <div>
              <label htmlFor="waitlist-purpose" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                <span>Primary Purpose / Use Case <span className="text-indigo-400">*</span></span>
              </label>
              <select
                id="waitlist-purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all duration-200"
              >
                <option value="Shopify Store Lead Generation">Shopify Store Lead Generation</option>
                <option value="B2B E-commerce Outreach">B2B E-commerce Outreach</option>
                <option value="Market Research & Analytics">Market Research &amp; Analytics</option>
                <option value="Agency Client Acquisition">Agency Client Acquisition</option>
                <option value="Custom Data Integration / API">Custom Data Integration / API</option>
                <option value="Other">Other Purpose</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="waitlist-message" className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>What features are most important to you? <span className="text-slate-500 font-normal">(Optional)</span></span>
              </label>
              <textarea
                id="waitlist-message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your dataset requirements or specific metrics you need..."
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-sm transition-all duration-200 resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full py-4 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Joining Waitlist...</span>
                </>
              ) : (
                <>
                  <span>Join Early Access List</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-slate-400 mt-3">
              🔒 We respect your privacy. No spam ever.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
