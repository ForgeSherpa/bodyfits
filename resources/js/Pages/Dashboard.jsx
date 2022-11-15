import React from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import useResetBg from "@/Hooks/useResetBg";

export default function Dashboard({ auth }) {
    useResetBg();
    console.log(auth);

    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                            <Link
                                as="button"
                                href={route("logout")}
                                method="post"
                                className="bg-slate-100 py-3 px-5 rounded-lg shadow-md hover:bg-slate-200 focus:outline-none active:opacity-80"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
