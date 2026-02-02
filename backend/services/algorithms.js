/**
 * Disk Scheduling Algorithms Service
 * Core algorithm logic preserved from original implementation
 */

// Validation function
function isValidInputNumbers(requestSequence, head) {
  for (let i = 0; i < requestSequence.length; ++i) {
    if (requestSequence[i] > 199 || requestSequence[i] < 0) {
      return false;
    }
  }
  if (head > 199 || head < 0) {
    return false;
  }
  return true;
}

// ---------- FCFS Algorithm ---------------
// Time Complexity: O(n)
function fcfs(requestSequence, head) {
  const requestFinalOrder = [head];
  for (let i = 0; i < requestSequence.length; ++i) {
    requestFinalOrder.push(requestSequence[i]);
  }
  
  let totalSeekCount = Math.abs(requestSequence[0] - head);
  for (let i = 1; i < requestSequence.length; ++i) {
    totalSeekCount += Math.abs(requestSequence[i] - requestSequence[i - 1]);
  }
  
  return {
    totalSeekCount,
    finalOrder: requestFinalOrder,
    averageSeekCount: (totalSeekCount / requestSequence.length).toFixed(2)
  };
}

// ---------- SSTF Algorithm ---------------
// Time Complexity: O(n^2)
function sstf(requestSequence, head) {
  const sequence = [...requestSequence];
  const len = sequence.length;
  const requestFinalOrder = [head];
  let totalSeekCount = 0;

  for (let i = 0; i < len; ++i) {
    const tmp = [];
    for (let j = 0; j < sequence.length; ++j) {
      tmp.push(Math.abs(requestFinalOrder[requestFinalOrder.length - 1] - sequence[j]));
    }

    const minIndex = tmp.indexOf(Math.min.apply(null, tmp));
    totalSeekCount += tmp[minIndex];
    requestFinalOrder.push(sequence[minIndex]);
    sequence.splice(minIndex, 1);
  }

  return {
    totalSeekCount,
    finalOrder: requestFinalOrder,
    averageSeekCount: (totalSeekCount / len).toFixed(2)
  };
}

// ---------- SCAN Algorithm ---------------
// Time Complexity: O(n log n)
function scan(requestSequence, head, direction) {
  const requestFinalOrder = [head];
  let tmp = 0;
  const tmpAry = [...requestSequence];
  
  const sorted = tmpAry.sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; ++i) {
    if (head < sorted[i]) {
      tmp = i;
      break;
    }
  }

  let totalSeekCount;

  if (direction === "Left") {
    for (let i = tmp - 1; i >= 0; --i) {
      requestFinalOrder.push(sorted[i]);
    }
    if (requestFinalOrder[requestFinalOrder.length - 1] !== 0) {
      requestFinalOrder.push(0);
    }
    for (let i = tmp; i < sorted.length; ++i) {
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs(head + requestFinalOrder[requestFinalOrder.length - 1]);
  } else {
    for (let i = tmp; i < sorted.length; ++i) {
      requestFinalOrder.push(sorted[i]);
    }
    if (requestFinalOrder[requestFinalOrder.length - 1] !== 199) {
      requestFinalOrder.push(199);
    }
    for (let i = tmp - 1; i >= 0; --i) {
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs((199 - head) + (199 - requestFinalOrder[requestFinalOrder.length - 1]));
  }

  return {
    totalSeekCount,
    finalOrder: requestFinalOrder,
    averageSeekCount: (totalSeekCount / requestSequence.length).toFixed(2)
  };
}

// ---------- C-SCAN Algorithm ---------------
function cscan(requestSequence, head, direction) {
  const requestFinalOrder = [head];
  let tmp = 0;
  const tmpAry = [...requestSequence];
  
  const sorted = tmpAry.sort((a, b) => b - a);

  for (let i = 0; i < sorted.length; ++i) {
    if (head > sorted[i]) {
      tmp = i;
      break;
    }
  }

  let totalSeekCount;

  if (direction === "Right") {
    for (let i = tmp - 1; i >= 0; --i) {
      requestFinalOrder.push(sorted[i]);
    }
    if (requestFinalOrder[requestFinalOrder.length - 1] !== 199) {
      requestFinalOrder.push(199);
    }
    for (let i = sorted.length - 1; i >= tmp; --i) {
      if (i === sorted.length - 1 && sorted[i] !== 0) {
        requestFinalOrder.push(0);
      }
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs(199 - head + 199 + requestFinalOrder[requestFinalOrder.length - 1]);
  } else {
    for (let i = tmp; i <= sorted.length - 1; ++i) {
      requestFinalOrder.push(sorted[i]);
    }
    if (requestFinalOrder[requestFinalOrder.length - 1] !== 0) {
      requestFinalOrder.push(0);
    }
    for (let i = 0; i < tmp; ++i) {
      if (i === 0 && sorted[i] !== 199) {
        requestFinalOrder.push(199);
      }
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs(head + 199 + (199 - requestFinalOrder[requestFinalOrder.length - 1]));
  }

  return {
    totalSeekCount,
    finalOrder: requestFinalOrder,
    averageSeekCount: (totalSeekCount / requestSequence.length).toFixed(2)
  };
}

// ---------- LOOK Algorithm ---------------
function look(requestSequence, head, direction) {
  const requestFinalOrder = [head];
  let tmp = 0;
  const tmpAry = [...requestSequence];
  
  const sorted = tmpAry.sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; ++i) {
    if (sorted[i] > head) {
      tmp = i;
      break;
    }
  }

  let totalSeekCount;

  if (direction === "Right") {
    for (let i = tmp; i < sorted.length; ++i) {
      requestFinalOrder.push(sorted[i]);
    }
    for (let i = tmp - 1; i >= 0; --i) {
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs(sorted[sorted.length - 1] - head + 
      Math.abs(sorted[sorted.length - 1] - sorted[0]));
  } else {
    for (let i = tmp - 1; i >= 0; --i) {
      requestFinalOrder.push(sorted[i]);
    }
    for (let i = tmp; i < sorted.length; ++i) {
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs(head - sorted[0]) + 
      Math.abs(sorted[sorted.length - 1] - sorted[0]);
  }

  return {
    totalSeekCount,
    finalOrder: requestFinalOrder,
    averageSeekCount: (totalSeekCount / requestSequence.length).toFixed(2)
  };
}

// ---------- C-LOOK Algorithm ---------------
function clook(requestSequence, head, direction) {
  const requestFinalOrder = [head];
  let tmp = 0;
  const tmpAry = [...requestSequence];
  
  const sorted = tmpAry.sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; ++i) {
    if (sorted[i] > head) {
      tmp = i;
      break;
    }
  }

  let totalSeekCount;

  if (direction === "Right") {
    for (let i = tmp; i < sorted.length; ++i) {
      requestFinalOrder.push(sorted[i]);
    }
    for (let i = 0; i < tmp; ++i) {
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs(sorted[sorted.length - 1] - head + 
      Math.abs(sorted[sorted.length - 1] - sorted[0]) + 
      Math.abs(requestFinalOrder[requestFinalOrder.length - 1] - sorted[0]));
  } else {
    for (let i = tmp - 1; i >= 0; --i) {
      requestFinalOrder.push(sorted[i]);
    }
    for (let i = sorted.length - 1; i >= tmp; --i) {
      requestFinalOrder.push(sorted[i]);
    }
    totalSeekCount = Math.abs(head - sorted[0]) + 
      Math.abs(sorted[sorted.length - 1] - sorted[0]) + 
      Math.abs(sorted[sorted.length - 1] - sorted[tmp]);
  }

  return {
    totalSeekCount,
    finalOrder: requestFinalOrder,
    averageSeekCount: (totalSeekCount / requestSequence.length).toFixed(2)
  };
}

// Compare all algorithms
function compareAll(requestSequence, head, direction) {
  const fcfsSeq = [...requestSequence];
  const sstfSeq = [...requestSequence];
  const scanSeq = [...requestSequence];
  const cscanSeq = [...requestSequence];
  const lookSeq = [...requestSequence];
  const clookSeq = [...requestSequence];

  const results = {
    fcfs: fcfs(fcfsSeq, head),
    sstf: sstf(sstfSeq, head),
    scan: scan(scanSeq, head, direction),
    cscan: cscan(cscanSeq, head, direction),
    look: look(lookSeq, head, direction),
    clook: clook(clookSeq, head, direction)
  };

  const seekCounts = [
    results.fcfs.totalSeekCount,
    results.sstf.totalSeekCount,
    results.scan.totalSeekCount,
    results.cscan.totalSeekCount,
    results.look.totalSeekCount,
    results.clook.totalSeekCount
  ];

  results.minimumSeekCount = Math.min(...seekCounts);

  return results;
}

module.exports = {
  isValidInputNumbers,
  fcfs,
  sstf,
  scan,
  cscan,
  look,
  clook,
  compareAll
};
