import React from 'react';
import { ClerkProvider } from "@clerk/clerk-react";
import { esES } from "@clerk/localizations";
import User from "./User";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UserIcon.css"

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const UserIcon = () => {
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey} 
      localization={esES}
      // fallbackRedirectUrl="https://promedios-carne.vercel.app/home"  // URL a la que redirigir después de iniciar sesión
      // afterSignOutUrl="https://promedios-carne.vercel.app/landing"  // URL a la que redirigir después de cerrar sesión
    >
      <User />
    </ClerkProvider>
  );
};

export default UserIcon;
