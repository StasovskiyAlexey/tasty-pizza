'use client';

import { createContext, useContext } from "react";
import { useStoreContext } from "./store-provider";
import { addToast } from "@heroui/toast";
import { UserWithOrderAndUserCart } from "@/app/api/auth/me/route";
import { toast } from "sonner";

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface LoginForm {
  username: string
  password: string
}

type AuthContextType = {
  getUser: () => Promise<{data: UserWithOrderAndUserCart}>;
  login: (form: LoginForm) => void;
  registration: (form: RegisterForm) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const {userStore} = useStoreContext();

  async function getUser() {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    
    if (data.success) {
      userStore.toggleToken(true)
    } else {
      userStore.toggleToken(false)
    }

    return data;
  }

  async function login(form: LoginForm) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });

      const data = await res.json();
 
      if (data.success) {
        toast(data.data)
      } else {
        toast(data.error)
      }

      return data.data;
    } catch(e) {
      console.log(e)
    } finally {
      getUser()
    }
  }

  async function registration(form: RegisterForm) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (data.success) {
        toast(data.data)
        toast('Увійдіть в аккаунт')
      } else {
        toast(data.error)
      }

      userStore.setMode('login')

      return data.data;
    } catch(e) {
      console.log(e)
    }
  }

  async function logout() {
    try {
      const res = await fetch('/api/auth/logout');
      const data = await res.json();

      if (data.success) {
        toast(data.data)
      } else {
        toast(data.error)
      }

      return data.data;
    } catch(e) {
      console.log(e)
    } finally {
      getUser()
    }
  }
  
  return <AuthContext.Provider value={{getUser, login, registration, logout}}>
    {children}
  </AuthContext.Provider>
}

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error;
    return context;
};