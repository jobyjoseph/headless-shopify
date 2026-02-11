"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Address = {
  id: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  province?: string | null;
  zip?: string | null;
  country?: string | null;
  phone?: string | null;
};

type NewAddressForm = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [settingDefault, setSettingDefault] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewAddressForm>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/shopify/customer-addresses", {
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Unable to load addresses.");
        }

        const data = (await response.json()) as {
          addresses?: Address[];
          defaultAddressId?: string | null;
        };

        setAddresses(data.addresses ?? []);
        setDefaultAddressId(data.defaultAddressId ?? null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load addresses.",
        );
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, []);

  const refreshAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/shopify/customer-addresses", {
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to load addresses.");
      }

      const data = (await response.json()) as {
        addresses?: Address[];
        defaultAddressId?: string | null;
      };

      setAddresses(data.addresses ?? []);
      setDefaultAddressId(data.defaultAddressId ?? null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load addresses.",
      );
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: keyof NewAddressForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAddress = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formData.firstName || !formData.lastName || !formData.address1) {
      setFormError("Please fill in required fields.");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch("/api/shopify/customer-addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          address1: formData.address1,
          address2: formData.address2 || undefined,
          city: formData.city || undefined,
          province: formData.province || undefined,
          zip: formData.zip || undefined,
          country: formData.country || undefined,
          phone: formData.phone || undefined,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to add address.");
      }

      setFormSuccess("Address added successfully.");
      setFormData({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        zip: "",
        country: "",
        phone: "",
      });
      setShowForm(false);
      await refreshAddresses();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to add address.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      setSettingDefault(addressId);
      setError(null);
      const response = await fetch("/api/shopify/customer-addresses", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addressId }),
      });

      const data = (await response.json()) as {
        addresses?: Address[];
        defaultAddressId?: string | null;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to set default address.");
      }

      setAddresses(data.addresses ?? []);
      setDefaultAddressId(data.defaultAddressId ?? null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to set default address.",
      );
    } finally {
      setSettingDefault(null);
    }
  };

  const mappedAddresses = useMemo(
    () =>
      addresses.map((address) => {
        const nameParts = [address.firstName, address.lastName]
          .filter(Boolean)
          .join(" ")
          .trim();
        return {
          ...address,
          displayName: address.name || nameParts || "",
          isDefault: address.id === defaultAddressId,
        };
      }),
    [addresses, defaultAddressId],
  );
  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Addresses</h1>
          <Link
            href="/account"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            Back to Account
          </Link>
        </div>

        {/* Add New Address Button */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors uppercase cursor-pointer text-sm"
          >
            {showForm ? "Close" : "Add New Address"}
          </button>
        </div>

        {showForm && (
          <form
            className="border border-gray-200 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleAddAddress}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-gray-900">
                First Name *
              </label>
              <input
                id="firstName"
                name="firstName"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.firstName}
                onChange={(event) =>
                  handleFormChange("firstName", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-gray-900">
                Last Name *
              </label>
              <input
                id="lastName"
                name="lastName"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.lastName}
                onChange={(event) =>
                  handleFormChange("lastName", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="address1" className="text-gray-900">
                Address Line 1 *
              </label>
              <input
                id="address1"
                name="address1"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.address1}
                onChange={(event) =>
                  handleFormChange("address1", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="address2" className="text-gray-900">
                Address Line 2
              </label>
              <input
                id="address2"
                name="address2"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.address2}
                onChange={(event) =>
                  handleFormChange("address2", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-gray-900">
                City
              </label>
              <input
                id="city"
                name="city"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.city}
                onChange={(event) =>
                  handleFormChange("city", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="province" className="text-gray-900">
                State / Province
              </label>
              <input
                id="province"
                name="province"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.province}
                onChange={(event) =>
                  handleFormChange("province", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="zip" className="text-gray-900">
                ZIP / Postal Code
              </label>
              <input
                id="zip"
                name="zip"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.zip}
                onChange={(event) =>
                  handleFormChange("zip", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="text-gray-900">
                Country
              </label>
              <input
                id="country"
                name="country"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.country}
                onChange={(event) =>
                  handleFormChange("country", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="phone" className="text-gray-900">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                value={formData.phone}
                onChange={(event) =>
                  handleFormChange("phone", event.target.value)
                }
              />
            </div>
            {formError && (
              <p className="text-sm text-red-600 md:col-span-2">{formError}</p>
            )}
            {formSuccess && (
              <p className="text-sm text-green-700 md:col-span-2">
                {formSuccess}
              </p>
            )}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors uppercase cursor-pointer text-sm"
              >
                {saving ? "Saving..." : "Save Address"}
              </button>
            </div>
          </form>
        )}

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <p className="text-gray-600">Loading addresses...</p>}
          {!loading && error && <p className="text-red-600">{error}</p>}
          {!loading && !error && mappedAddresses.length === 0 && (
            <p className="text-gray-600">No addresses found.</p>
          )}
          {!loading &&
            !error &&
            mappedAddresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 p-5 relative flex flex-col"
              >
                {address.isDefault && (
                  <span className="absolute top-3 right-3 text-xs bg-gray-100 text-gray-600 px-2 py-1">
                    Default
                  </span>
                )}
                <div className="space-y-1 flex-1">
                  {address.displayName && (
                    <p className="font-medium text-gray-900">
                      {address.displayName}
                    </p>
                  )}
                  {address.address1 && (
                    <p className="text-gray-600">{address.address1}</p>
                  )}
                  {address.address2 && (
                    <p className="text-gray-600">{address.address2}</p>
                  )}
                  {(address.city || address.province || address.zip) && (
                    <p className="text-gray-600">
                      {address.city}
                      {address.city && address.province ? ", " : ""}
                      {address.province} {address.zip}
                    </p>
                  )}
                  {address.country && (
                    <p className="text-gray-600">{address.country}</p>
                  )}
                  {address.phone && (
                    <p className="text-gray-500 text-sm mt-2">
                      {address.phone}
                    </p>
                  )}
                </div>
                <div className="flex gap-4 pt-4 mt-4 border-t border-gray-100">
                  <button className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                    Edit
                  </button>
                  {!address.isDefault && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleSetDefault(address.id)}
                        disabled={settingDefault === address.id}
                        className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer disabled:opacity-60"
                      >
                        {settingDefault === address.id
                          ? "Setting..."
                          : "Set as Default"}
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm cursor-pointer">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
