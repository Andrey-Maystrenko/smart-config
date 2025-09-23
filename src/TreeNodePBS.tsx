import {TreeNodeProps} from "./types";
import TreeNodeXBS from "./TreeNodeXBS";
import React from "react";

export const TreeNodePBS = (props: TreeNodeProps) => {
    return (
        <TreeNodeXBS
            {...props}
        />
    );
}