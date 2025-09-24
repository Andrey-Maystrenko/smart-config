import {TreeNodeProps} from "./types";
import TreeNodeXBS from "./TreeNodeXBS";
import React from "react";

export const TreeNodeRBS = (props: TreeNodeProps) => {
    return (
        <TreeNodeXBS
            {...props}
        />
    );
}