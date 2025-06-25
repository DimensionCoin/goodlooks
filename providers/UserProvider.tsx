"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUser } from "@/actions/user.actions";

type SubscriptionTier = "free" | "basic" | "premium";

type UserContextType = {
  isAuthenticated: boolean;
  clerkId: string;
  tier: SubscriptionTier;
  createdAt: string | null;
  isContextLoaded: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [tier, setTier] = useState<SubscriptionTier>("free");
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [isContextLoaded, setIsContextLoaded] = useState<boolean>(false);

  // Function to refresh user data from the backend.
  const refreshUser = async () => {
    if (!user) return;
    try {
      const data = await getUser(user.id);
      if (data) {
        setTier(data.subscriptionTier || "free");
        setCreatedAt(data.createdAt);
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      setIsContextLoaded(false);
      return;
    }
    if (!user) {
      setIsContextLoaded(true);
      return;
    }
    // Initial fetch
    getUser(user.id)
      .then((data) => {
        if (data) {
          setTier(data.subscriptionTier || "free");
          setCreatedAt(data.createdAt);
        }
        setIsContextLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        setIsContextLoaded(true);
      });
  }, [isLoaded, user]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated: !!user,
        clerkId: user ? user.id : "",
        tier,
        createdAt,
        isContextLoaded,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
