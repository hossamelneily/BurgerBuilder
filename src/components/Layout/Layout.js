import React from "react";
import WithClass from "../../Hoc/Withclasses";
import classes from "./Layout.module.css"


const Layout=(props)=> (

        <WithClass>
                <div>ToolBar, SideBar, Backdrop </div>
                <main className={classes.Content}>
                        {props.children}
                </main>
        </WithClass>

)

export default Layout