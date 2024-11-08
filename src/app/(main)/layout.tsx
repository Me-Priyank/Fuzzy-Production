import Sidebar  from "@/components/sidebar";
import React from "react";

type Props = {childern:React.ReactNode}

const Layout = (props: Props) =>{
    return <div className="flex overflow-hidden h-screen">
        <Sidebar/>
        <div className="w-full">
            {props.childern}
        </div>
    </div>
}

export default Layout;