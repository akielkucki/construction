'use client';

import { usePathname } from 'next/navigation';
import React, {useEffect, useState} from "react";

export default function PathnameComponent() {
    const pathname = usePathname();
    const [pageName, setPageName] = useState("");
    useEffect(() => {
        if (pathname.includes('/')) {
            setPageName(`${pathname.split('/')[1]}`);
        } else {
            setPageName(`Home`);
        }
    },[pathname])



    return <>{pathname}</>;
}