"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/form-controls/button/button-form-control";
import Input from "@/components/form-controls/input/input-form-control";

type MultipassResponse = {
  accessToken?: string;
  expiresAt?: string;
  error?: string;
};

export default function MultipassTestPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<MultipassResponse | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/shopify/multipass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json().catch(() => ({}))) as MultipassResponse;

      if (!response.ok) {
        setResult({ error: payload.error || "Request failed." });
        return;
      }

      setResult(payload);
    } catch {
      setResult({ error: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-5 py-10">
      <h1 className="text-2xl font-semibold mb-2">Multipass API Test</h1>
      <p className="text-gray-600 mb-6">
        Submit an email to test <code>/api/shopify/multipass</code>.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="email"
          label="Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="customer@example.com"
          required
        />

        <Button type="submit" loading={isSubmitting} size="full">
          Generate Customer Access Token
        </Button>
      </form>

      {result && (
        <section className="mt-6 border border-gray-200 p-4">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : (
            <div className="space-y-2 text-sm">
              <p className="text-green-700 font-medium">Success</p>
              <p>
                <span className="font-semibold">Access Token:</span>{" "}
                <span className="break-all">{result.accessToken}</span>
              </p>
              <p>
                <span className="font-semibold">Expires At:</span>{" "}
                {result.expiresAt || "N/A"}
              </p>
              <p className="text-gray-500">
                A cookie named <code>shopifyCustomerAccessToken</code> is also
                set on success.
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
