"use client"

import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  user: {
    id: string
    name?: string
    email?: string
    avatar?: string
    role?: string
  } | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: supabaseUser } } = await supabase.auth.getUser()
      if (supabaseUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .single()

        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: profile?.full_name,
          avatar: profile?.avatar_url,
          role: profile?.role,
        })
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
} 