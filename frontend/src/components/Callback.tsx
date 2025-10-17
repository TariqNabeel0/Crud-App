import React from 'react';
import { useHandleSignInCallback } from '@logto/react';

const Callback: React.FC = () => {
  const { isLoading } = useHandleSignInCallback(() => {
    // Redirect to home page after successful sign in
    window.location.href = '/';
  });

  if (isLoading) {
    return <div>Processing sign in...</div>;
  }

  return <div>Redirecting...</div>;
};

export default Callback;