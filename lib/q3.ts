interface ILink {
  id: number;
  name: string;
  parentId?: number;
}

class TreeNode {
  id: number;
  name:  string;
  children: TreeNode[] = [];
  constructor(id: number, name?: string) {
    this.id = id;
    this.name = name;
  }
  fill(n: ILink) {
    this.name = n.name;
  }
  append(n: TreeNode) {
    this.children.push(n);
  }
}

export default function tableTree(list: ILink[]) {
  const existMap = new Map<number, TreeNode>();

  let root: TreeNode | null = null;
  
  list.forEach(l =>{
    let node = existMap.get(l.id);
    if (node) {
      node.fill(l);
    } else {
      node = new TreeNode(l.id, l.name);
      existMap.set(l.id, node);
    }

    if (l.parentId) {
      const parent = existMap.get(l.parentId);
      if (parent) {
        parent.append(node);
      } else {
        const parentNode = new TreeNode(l.parentId);
        existMap.set(parentNode.id, parentNode);
        parentNode.append(node);
      }
    } else {
      if (!root) {
        root = node;
      } else {
        throw new Error('root exist');
      }
    }
  });

  return root;
}