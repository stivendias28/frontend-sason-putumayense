"use client"; 
import { useSession } from "next-auth/react";

const ClientSession = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <div>{JSON.stringify(session)}</div>;
};

export default ClientSession;
