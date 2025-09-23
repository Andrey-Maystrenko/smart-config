import {BsType, LinkedSourceType} from "./App";

export type TreeNodeProps = {
    node: BsType,
    prevTree: BsType | null,
    level: number,
    onSelect: (node: BsType) => void,
    updateTreeXBS: (node: BsType) => void,
    selectedNode: BsType,
    isLinkingMode: boolean,
    linkSource: LinkedSourceType,
    updateNodePosition: (nodeId: number, any) => void
}
