import React, { useEffect } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function AuthLogin() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="w-full px-2 md:w-1/2 md:m-auto mt-20">
      <Auth
        redirectTo="http://localhost:3000/"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabase}
        view="sign_up"
        socialLayout="vertical"
      />
    </div>
  );
}
