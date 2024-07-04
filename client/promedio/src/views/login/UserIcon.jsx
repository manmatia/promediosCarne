import React from 'react';
import { ClerkProvider } from "@clerk/clerk-react";
import { esES } from "@clerk/localizations";
import User from "./User";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UserIcon.css"

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const UserIcon = () => {
  return (
    <ClerkProvider publishableKey={clerkPubKey} localization={esES}>
      <User />
    </ClerkProvider>
  );
};

export default UserIcon;
