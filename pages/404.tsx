import {Htag} from "../components";
import {withLayout} from "../layout/Layout";
import React from "react";

export function Error404(): JSX.Element {

    return (
        <>
            <Htag tag='h1'>Page not found</Htag>
        </>
    );
}

export default withLayout(Error404);