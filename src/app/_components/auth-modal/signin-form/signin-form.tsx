"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { z, ZodError } from "zod";

import Button from "@/components/form-controls/button/button-form-control";
import Input from "@/components/form-controls/input/input-form-control";
import { signInSchema } from "@/lib/zod";

type SignInFormData = z.infer<typeof signInSchema>;

/**
 * SignInForm component provides a user interface for signing in with email and password.
 * It manages form state, validation using Zod, and handles form submission.
 *
 * @component
 * @returns {JSX.Element} The rendered sign-in form.
 */

const SignInForm = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validates a single field using Zod schema
   * @param field - The field name to validate
   * @param value - The value to validate
   * @returns Validation result with error message if invalid
   */
  const validateSingleField = (field: keyof SignInFormData, value: string) => {
    try {
      // Extract the specific field schema and validate
      const fieldSchema = signInSchema.shape[field];
      fieldSchema.parse(value);

      // Clear error if validation passes
      setErrors((prev) => {
        delete prev[field];
        return { ...prev };
      });
      return { success: true, error: null };
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.issues[0]?.message || "Invalid input";
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
        return { success: false, error: errorMessage };
      }
      return { success: false, error: "Validation error" };
    }
  };

  /**
   * Validates form data using Zod schema
   * @param data - Form data to validate
   * @returns Object containing validation success status and errors
   */
  const validateForm = (data: SignInFormData) => {
    try {
      signInSchema.parse(data);
      setErrors({});
      return { success: true, errors: {} };
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<SignInFormData> = {};
        error.issues.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof SignInFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        return { success: false, errors: fieldErrors };
      }
      return { success: false, errors: {} };
    }
  };

  /**
   * Handles input field changes and validates the field in real-time
   * @param field - The form field being updated
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };

  /**
   * Handles the blur event for an input field.
   * Validates the specified field using the Zod schema when the input loses focus.
   *
   * @param field - The name of the form field being blurred.
   * @param value - The current value of the field.
   */
  const handleInputBlur = (field: keyof SignInFormData, value: string) => {
    validateSingleField(field, value);
  };

  /**
   * Handles the form submission event.
   * Validates the form data and attempts to sign in the user if validation passes.
   * @param e - Form submission event
   */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm(formData);
    if (!validation.success) {
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
    } catch (err) {
      console.error("Sign in error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-6">
        <Input
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            handleInputChange("email", e.target.value);
          }}
          onBlur={(e) => {
            handleInputBlur("email", e.target.value);
          }}
          error={errors.email}
        />
      </div>
      <div className="mt-6">
        <Input
          type="password"
          className="border border-gray-300 w-full px-3 py-1.5 outline-none"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            handleInputChange("password", e.target.value);
          }}
          onBlur={(e) => {
            handleInputBlur("password", e.target.value);
          }}
          error={errors.password}
        />
      </div>
      <div className="text-right mt-3">
        <a href="#" className="underline text-sm">
          Forgot Password?
        </a>
      </div>
      <div className="mt-3 mb-3">
        <Button
          type="submit"
          size="full"
          disabled={
            isSubmitting ||
            !formData.email ||
            !formData.password ||
            Object.keys(errors).length > 0
          }
          loading={isSubmitting}
        >
          {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
