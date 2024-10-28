"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { z } from "zod";

// Define the validation schema
const profileSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  website: z.string().url("Must be a valid URL").optional(),
  avatarUrl: z.string().url("Must be a valid URL").optional(),
});

type ProfileData = {
  fullname: string | null;
  username: string | null;
  website: string | null;
  avatarUrl: string | null;
};

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    fullname: null,
    username: null,
    website: null,
    avatarUrl: null,
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profile")
        .select(`fullname, username, website, avatarUrl`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      alert("Error loading user data!" + JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    try {
      setLoading(true);

      // Validate profile data
      profileSchema.parse(profile);

      const { error } = await supabase.from("profile").upsert({
        id: user?.id as string,
        ...profile,
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(
          "Validation errors: " + error.errors.map((e) => e.message).join(", ")
        );
      } else {
        alert("Error updating the data!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        uid={user?.id ?? null}
        url={profile.avatarUrl}
        size={150}
        onUpload={(url) => {
          setProfile((prev) => ({ ...prev, avatarUrl: url }));
          updateProfile();
        }}
      />

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={profile.fullname || ""}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, fullname: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={profile.username || ""}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, username: e.target.value }))
          }
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={profile.website || ""}
          onChange={(e) =>
            setProfile((prev) => ({ ...prev, website: e.target.value }))
          }
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={updateProfile}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
