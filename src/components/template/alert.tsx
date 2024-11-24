"use client";

import { useEffect } from 'react';
import { redirect } from 'next/navigation'
import layoutStyles from "@/styles/layout.module.css";

type Params = {params: {message: string, link: string}}

const Alert = ({ params: {message, link} } : Params) => {
    useEffect(() => {
      alert(message);
      redirect(link);
    }, []);

    return (
      <div></div>
    );
  };

export { Alert }