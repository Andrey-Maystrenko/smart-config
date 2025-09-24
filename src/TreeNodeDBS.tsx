import React from "react";
import {TreeNodeProps} from "./types";
import TreeNodeXBS from "./TreeNodeXBS";

export const TreeNodeDBS = (props: TreeNodeProps) => {
    return (
        <TreeNodeXBS
            {...props}
        />
    );
}