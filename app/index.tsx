import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";

export default function Index() {
  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return <Redirect href={session ? "/(tabs)" : "/login"} />;
}
