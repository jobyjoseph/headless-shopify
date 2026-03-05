export const getCurrentUser = async () => {
  try {
    const response = await fetch("/api/shopify/customer", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      return null;
    }

    const data = await response.json();
    const customer = data?.customer ?? null;

    if (!customer) {
      return null;
    }

    const name = [customer.firstName, customer.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    return {
      ...customer,
      name: name || undefined,
    };
  } catch {
    return null;
  }
};
