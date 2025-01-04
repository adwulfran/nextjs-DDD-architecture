"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Page() {
    return (
        <div className="flex items-center justify-center h-screen dark:bg-gray-800">
            <button onClick={() => signIn("google", { callbackUrl: "/" })} className="px-4 py-2 border flex justiy-between gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <Image className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" width={24}
                    height={24} />
                <span>Login with Google</span>
            </button>
        </div>
    );
};

