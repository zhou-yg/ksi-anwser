type IStone = number[];

function checkValid(s: IStone[]) {
  const tail = s[s.length - 1];
  return s[0][0] === tail[1];
}

function getMatch(current: IStone, next: IStone): IStone | null {
  if (current[1] === next[0]) {
    return next;
  }
  if (current[1] === next[1]) {
    return [next[1], next[0]] as IStone;
  }
  return null;
}

function buildChain(currentStones: IStone[], nextStones: IStone[]): IStone[] | null {
  // console.log("🚀 ~ file: q4.ts ~ line 15 ~ buildChain ~ currentStones", currentStones)
  // console.log("🚀 ~ file: q4.ts ~ line 15 ~ buildChain ~ nextStones", nextStones)

  if (!nextStones.length) {
    return currentStones;
  }

  const tail = currentStones[currentStones.length - 1];

  let finalResult: IStone[] | null = null;
  
  let i = 0;
  while (i < nextStones.length) {
    const next = nextStones[i];
    const matched = getMatch(tail, next);
    if (matched) {
      let clonedNext = nextStones.slice();
      clonedNext.splice(i, 1);
      let result = buildChain(currentStones.concat([matched]), clonedNext);
      if (result) {
        finalResult = result;
        break;
      }
    }
    i++;
  }
  

  return finalResult;
}

export default function dominoes(stones: IStone[]) {

  let i = 0;

  let finalResult: IStone[] = [];
  
  while (i < stones.length) {
    const clonedStones = stones.slice();

    clonedStones.splice(i, 1);

    let result = buildChain([stones[i]], clonedStones);
    if (!result) {
      result = buildChain(
        [
          stones[i].slice().reverse() as IStone,
        ],
        clonedStones
      );
      if (result && checkValid(result)) {
        finalResult = result;
        break;
      }
    } else if (checkValid(result)) {
      finalResult = result;
      break;
    }

    i++;
  }

  return finalResult;
}