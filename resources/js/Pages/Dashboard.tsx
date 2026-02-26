'use client'
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import CustomerLayout from "./Layout/Customer";

interface PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
}
export default function Dashboard() {
     const { flash } = usePage().props as PageProps;

     useEffect(() => {
        if (flash?.success) alert(flash.success);
        if (flash?.error) alert(flash.error);
    }, [flash]);

  return (
    <CustomerLayout>
      <h1>dashboard customer</h1>
    </CustomerLayout>
  );
}