"use client";

import React, { useState } from "react";
import { Button } from "@leadflow/ui";
import { contactFormAction, type FormData } from "@/app/actions/contact";

const EMPTY_FORM: FormData = { name: "", email: "", message: "" };

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await contactFormAction(formData);

      if (res.success) {
        setSubmitted(true);
        setFormData(EMPTY_FORM);
      } else {
        setErrorMsg(res.error);
      }
    } catch {
      setErrorMsg("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-[#6366f1] text-sm transition-all duration-200 disabled:opacity-60";

  return (
    <section
      id="contact"
      className="w-full py-24 bg-white flex flex-col items-center px-6"
    >
      <div className="max-w-xl w-full text-center mb-10 select-none">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Get in Touch
        </h2>
        <p className="mt-3 text-slate-500 text-base">
          Have questions about Shopify opportunity datasets? We&apos;re here to help.
        </p>
      </div>

      <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-100/80 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.03)]">
        {submitted ? (
          <div className="text-center py-12 select-none">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-500 border border-green-100/50 mb-4 font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
            <p className="text-slate-500 mt-2 text-sm">
              We&apos;ll get back to you within 24 hours.
            </p>
            <Button
              variant="outline"
              className="mt-6 text-sm border-slate-200"
              onClick={() => setSubmitted(false)}
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  disabled={loading}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  disabled={loading}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@agency.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                maxLength={5000}
                disabled={loading}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help with your dataset requirements?"
                className={`${inputClass} resize-none`}
              />
            </div>

            {errorMsg && (
              <p
                role="alert"
                className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
              >
                {errorMsg}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full py-3.5 text-sm bg-[#6366f1] hover:bg-[#4f46e5] shadow-lg shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}