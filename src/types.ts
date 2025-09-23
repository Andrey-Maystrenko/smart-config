export type BsType = {
    id: any,
    name: string,
    children: BsType[]
}

export enum StructureType {
    RBS = "RBS",
    PBS = "PBS",
    DBS = "DBS"
}

export type LinkedSourceType = {
    node: BsType,
    structureType: StructureType
}

export type ConnectionType = {
    id: any,
    source: {id: any, type: StructureType},
    target: {id: any, type: StructureType}
}


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
