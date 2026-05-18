"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        message: form.get("message")
      })
    });
    setMessage(response.ok ? "ধন্যবাদ। আমাদের team খুব দ্রুত contact করবে।" : "Please try again.");
  }

  return (
    <form onSubmit={submit} className="rounded-lg bg-white p-5 shadow-sm dark:bg-white/10">
      <div className="grid gap-4">
        <input
          required
          name="name"
          placeholder="আপনার নাম"
          className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
        />
        <input
          required
          name="phone"
          placeholder="Phone number"
          className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
        />
        <textarea
          required
          name="message"
          rows={5}
          placeholder="আপনার message"
          className="rounded-lg border border-black/10 bg-cream px-3 py-3 outline-none dark:border-white/10 dark:bg-white/10"
        />
        <button className="rounded-lg bg-ink px-4 py-3 font-black text-white dark:bg-mango-500 dark:text-ink">
          Send Message
        </button>
        {message ? <p className="text-sm font-bold text-leaf-700 dark:text-mango-300">{message}</p> : null}
      </div>
    </form>
  );
}
