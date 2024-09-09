export class Node {
  constructor(
    private data: number,
    private leftNode: Node,
    private rightNode: Node
  ) {}
}

export class BinaryTree {
  constructor() {}
}

export type BTreeNode = {
  data: number;
  leftNode: BTreeNode | null;
  rightNode: BTreeNode | null;
};

type Pos = keyof Pick<BTreeNode, "leftNode" | "rightNode">;

export function initBinaryTree() {
  let bTreeRoot: BTreeNode | null = null;

  const insert = (value: number) => {
    bTreeRoot = recurseInsert(value, bTreeRoot);
    console.log(bTreeRoot);
    return bTreeRoot;
  };

  const recurseInsert = (
    value: number,
    rootNode: BTreeNode | null
  ): BTreeNode => {
    if (!rootNode) {
      return {
        data: value,
        leftNode: null,
        rightNode: null,
      };
    }

    if (rootNode?.data > value) {
      rootNode.leftNode = recurseInsert(value, rootNode.leftNode);
      return rootNode;
    } else {
      rootNode.rightNode = recurseInsert(value, rootNode.rightNode);
      return rootNode;
    }
  };

  const recurseSearch = (
    value: number,
    searchNode: BTreeNode | null,
    parentNode: BTreeNode | null,
    curPos?: Pos
  ): [BTreeNode | null, Pos | undefined] | null => {
    if (!searchNode) {
      return null;
    }
    if (searchNode.data === value) {
      return [parentNode, curPos];
    } else if (searchNode.data > value) {
      return recurseSearch(value, searchNode.leftNode, parentNode, "leftNode");
    } else {
      return recurseSearch(
        value,
        searchNode.rightNode,
        parentNode,
        "rightNode"
      );
    }
  };

  const remove = (value: number) => {
    let nodeForRemove;
    if (!bTreeRoot) {
      return null;
    }
    if (bTreeRoot.data === value) {
      bTreeRoot = null;
      return bTreeRoot;
    }

    if (bTreeRoot.data > value) {
      nodeForRemove = recurseSearch(
        value,
        bTreeRoot?.leftNode,
        bTreeRoot,
        "leftNode"
      );
    } else {
      nodeForRemove = recurseSearch(
        value,
        bTreeRoot?.rightNode,
        bTreeRoot,
        "rightNode"
      );
    }

    if (!nodeForRemove) return null;

    const [node, pos] = nodeForRemove;

    if (!node || !pos) {
      bTreeRoot = null;
      return bTreeRoot;
    }

    node[pos] = null;
    return bTreeRoot;
  };

  //   const getAllNodeChildValues = (rootNode: BTreeNode | null): number[] => {
  //     const values: number[] = [];
  //     if (!rootNode) return [];
  //     values.push(rootNode.data);
  //     values.push(...getAllNodeChildValues(rootNode.leftNode));
  //     values.push(...getAllNodeChildValues(rootNode.rightNode));
  //     return values;
  //   };

  const edit = (prevValue: number, newValue: number) => {
    const results = recurseSearch(prevValue, bTreeRoot, null);

    if (!results) return null;

    const [node, pos] = results;

    if (!node || !pos) {
      if (bTreeRoot) {
        bTreeRoot.data = newValue;
      } else {
        bTreeRoot = {
          data: newValue,
          leftNode: null,
          rightNode: null,
        };
      }

      return bTreeRoot;
    }

    if (node && pos && node[pos]) {
      node[pos].data = newValue;
      return bTreeRoot;
    } else {
      return null;
    }
  };

  const showRecurce = (rootNode: BTreeNode | null, deep: number = 0) => {
    const bTreeVisualMap: string[] = [];

    if (!rootNode) {
      return bTreeVisualMap;
    }

    bTreeVisualMap[deep] = `${rootNode.data}\n`;

    if (rootNode.leftNode || rootNode.rightNode) {
      bTreeVisualMap[deep] += `${showRecurce(
        rootNode.leftNode,
        deep + 1
      )}   ${showRecurce(rootNode.rightNode, deep + 1)}\n`;
    }
    return bTreeVisualMap;
  };

  const show = () => {
    if (!bTreeRoot) return "<none>";
    let finalViz = "";

    const bTreeVisualMap = showRecurce(bTreeRoot);
    console.log(bTreeVisualMap);
    const maxDeep = bTreeVisualMap.length;
    console.log(maxDeep);
    for (let x = maxDeep - 1; x >= 0; x--) {
      finalViz += "\t".repeat(x) + bTreeVisualMap[x];
    }

    console.log(finalViz);

    return finalViz;
  };

  const search = (value: number) => {
    if (!bTreeRoot) return null;

    const res = recurseSearch(value, bTreeRoot, null);

    if (!res) return null;

    const [node, pos] = res;

    if (!node) {
      return bTreeRoot.data;
    }

    if (node && pos && node[pos]) {
      return node[pos].data;
    }
  };

  return {
    bTreeRoot,
    insert,
    edit,
    remove,
    show,
    search,
  };
}
