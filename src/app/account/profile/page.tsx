"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

type ProfileFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PasswordFormState = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [passwords, setPasswords] = useState<PasswordFormState>({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setProfileError(null);
        const response = await fetch("/api/shopify/customer", {
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) {
          setProfile({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
          });
          return;
        }

        const data = (await response.json()) as {
          customer?: {
            firstName?: string | null;
            lastName?: string | null;
            email?: string | null;
            phone?: string | null;
          } | null;
        };

        const customer = data.customer;
        if (customer) {
          setProfile({
            firstName: customer.firstName || "",
            lastName: customer.lastName || "",
            email: customer.email || "",
            phone: customer.phone || "",
          });
        }
      } catch {
        setProfileError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileChange = (
    field: keyof ProfileFormState,
    value: string,
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (
    field: keyof PasswordFormState,
    value: string,
  ) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setProfileSuccess(null);
    setProfileError(null);
    try {
      setSavingProfile(true);
      const response = await fetch("/api/shopify/customer-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: profile.firstName || undefined,
          lastName: profile.lastName || undefined,
          email: profile.email || undefined,
          phone: profile.phone || undefined,
        }),
      });

      const data = (await response.json()) as {
        customer?: {
          firstName?: string | null;
          lastName?: string | null;
          email?: string | null;
          phone?: string | null;
        } | null;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to update profile.");
      }

      if (data.customer) {
        setProfile({
          firstName: data.customer.firstName || "",
          lastName: data.customer.lastName || "",
          email: data.customer.email || "",
          phone: data.customer.phone || "",
        });
      }

      setProfileSuccess("Profile updated successfully.");
    } catch (err) {
      setProfileError(
        err instanceof Error ? err.message : "Unable to update profile.",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setPasswordSuccess(null);
    setPasswordError(null);

    if (!passwords.newPassword || !passwords.confirmNewPassword) {
      setPasswordError("Please enter and confirm your new password.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    try {
      setSavingPassword(true);
      const response = await fetch("/api/shopify/customer-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwords.newPassword,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to update password.");
      }

      setPasswords({
        newPassword: "",
        confirmNewPassword: "",
      });
      setPasswordSuccess("Password updated successfully.");
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Unable to update password.",
      );
    } finally {
      setSavingPassword(false);
    }
  };
  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          <Link
            href="/account"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            Back to Account
          </Link>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-gray-900">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="John"
                value={profile.firstName}
                onChange={(event) =>
                  handleProfileChange("firstName", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="Doe"
                value={profile.lastName}
                onChange={(event) =>
                  handleProfileChange("lastName", event.target.value)
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
              placeholder="you@example.com"
              value={profile.email}
              onChange={(event) =>
                handleProfileChange("email", event.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-gray-900">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
              placeholder="+1 (555) 000-0000"
              value={profile.phone}
              onChange={(event) =>
                handleProfileChange("phone", event.target.value)
              }
            />
          </div>

          {loading && <p className="text-sm text-gray-500">Loading...</p>}
          {profileError && (
            <p className="text-sm text-red-600">{profileError}</p>
          )}
          {profileSuccess && (
            <p className="text-sm text-green-700">{profileSuccess}</p>
          )}

          <button
            type="submit"
            disabled={savingProfile}
            className="mt-4 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase self-start"
          >
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <hr className="my-8 border-gray-200" />

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Change Password
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-gray-900">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="••••••••"
                value={passwords.newPassword}
                onChange={(event) =>
                  handlePasswordChange("newPassword", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmNewPassword" className="text-gray-900">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="••••••••"
                value={passwords.confirmNewPassword}
                onChange={(event) =>
                  handlePasswordChange("confirmNewPassword", event.target.value)
                }
              />
            </div>
            <button
              type="submit"
              disabled={savingPassword}
              className="mt-2 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase self-start"
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </button>
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-sm text-green-700">{passwordSuccess}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
