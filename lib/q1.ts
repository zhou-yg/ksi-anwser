enum EMatchResult {
  'win' = 'win',
  'loss' = 'loss',
  'draw' = 'draw'
};

function parseMessage(m: string) {
  const pieces = m.trim().split(/;|\n/);

  let stack: string[] = [];
  const keywords: EMatchResult[] = [ EMatchResult.win, EMatchResult.loss, EMatchResult.draw ];

  const validMatch = pieces.reduce((result, str: EMatchResult) => {
    // valid
    if (keywords.includes(str)) {
      if (stack.length === 2) {
        result.push(
          [
            stack[0],
            stack[1],
            str,
          ]
        );
      }
      stack = [];
    }  else {
      if (stack.length === 2) {
        stack = [];
      } else {
        stack.push(str);
      }
    }

    return result;
  }, [] as Array<[string, string, EMatchResult]>);

  return validMatch;
}

class Record {
  mp: number = 0;
  w: number = 0;
  d: number = 0;
  l: number = 0;
  p: number = 0;
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  win() {
    this.mp++;
    this.w++;
    this.p += 3;
  }
  loss() {
    this.mp++;
    this.l++;
  }
  draw() {
    this.mp++;
    this.d++;
    this.p += 1;
  }
}

function calcMatch(records: Record[], matches: Array<[string, string, EMatchResult]>) {
  const recordsCloned = records.slice();

  matches.forEach(match => {
    const [first, second, result] =  match;

    let firstRecord = recordsCloned.find(r => r.name === first);
    if (!firstRecord) {
      firstRecord = new Record(first);
      recordsCloned.push(firstRecord);
    }

    let secondRecord = recordsCloned.find(r => r.name === second);
    if (!secondRecord) {
      secondRecord = new Record(second);
      recordsCloned.push(secondRecord);
    }

    switch(result) {
      case EMatchResult.draw:
        firstRecord.draw();
        secondRecord.draw();
        break;
      case EMatchResult.win:
        firstRecord.win();
        secondRecord.loss();
        break;
      case EMatchResult.loss:
        firstRecord.loss();
        secondRecord.win();
        break;
    }
  });

  return recordsCloned;
}

export default function tournament(tournamentMessage: string) {

  const matches = parseMessage(tournamentMessage);

  let records:  Record[] = [];

  records = calcMatch(records, matches);

  return {
    team: records.reduce((r, record) => {
      return Object.assign(r, {
        [record.name]: record,
      });
    }, {} as { [key: string]: Record })
  };
}


