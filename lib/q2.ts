
interface ILink {
  id: number;
  before?: number;
  after?: number;
  first?: boolean;
  last?: boolean;
}

export default function buildLinkList(linkList: ILink[]) {
  const result = [];

  let waitList1 = linkList.filter(l => !(l.first || l.last));
  let waitList2 = linkList.filter(l => l.first || l.last);
  let preLength =  0;

  while (waitList1.length > 0 && waitList1.length !== preLength) {
    preLength = waitList1.length;

    waitList1 = waitList1.filter((l) => {
      if (l.first || l.last) {
        return true;
      }

      if (l.before !== undefined || l.after !== undefined) {
        if (l.before !== undefined) {
          const i = result.findIndex(num => num ===  l.before);
          if (i >= 0) {
            result.splice(i, 0, l.id);
            return false;
          }
          return true;
        } else if (l.after !== undefined) {
          const i = result.findIndex(num => num === l.after);
          if (i >= 0) {
            result.splice(i + 1, 0, l.id);
            return false;
          }
          return true;
        }
      } else {
        result.push(l.id);
        return false;
      }
      return true;
    });
  }

  waitList2.forEach((l) => {
    if (l.first || l.last) {
      if (l.first) {
        result.splice(0, 0, l.id);
      } else if (l.last) {
        result.push(l.id);
      }
    }
  });
  
  return result;
}