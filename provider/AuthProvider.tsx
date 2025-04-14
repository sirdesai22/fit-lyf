import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/initSupabase';
import { Session } from '@supabase/supabase-js';

type ContextProps = {
	user: null | boolean;
	session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
	children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
	// user null = loading
	const [user, setUser] = useState<null | boolean>(null);
	const [session, setSession] = useState<Session | null>(null);
    const handleAuth = async () => {
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData?.session ?? null);
        setUser(!!sessionData?.session);
    
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                setSession(session);
                setUser(!!session);
            }
        );
    
        // // ✅ Correct unsubscribe handling
        // return () => {
        //     authListener?.unsubscribe();
        // };
    };
    
	useEffect(() => {
		handleAuth();
	}, [user]);

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };