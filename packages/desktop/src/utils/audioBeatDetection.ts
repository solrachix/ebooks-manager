interface IntervalCounts {
  interval: number;
  count: number;
}

export default function (url: Blob): void {
  // const reader = new FileReader()
  // const context = new (window.AudioContext || window.webkitAudioContext)()
  // reader.onload = function () {
  //   context.decodeAudioData(reader?.result, function (buffer) {
  // prepare(buffer)
  //   })
  // }
  // reader.readAsArrayBuffer(url)
};

function prepare (buffer: AudioBuffer) {
  const offlineContext = new OfflineAudioContext(1, buffer.length, buffer.sampleRate)
  const source = offlineContext.createBufferSource()
  source.buffer = buffer
  const filter = offlineContext.createBiquadFilter()
  filter.type = 'lowpass'
  source.connect(filter)
  filter.connect(offlineContext.destination)
  source.start(0)
  offlineContext.startRendering()
  offlineContext.oncomplete = function (e) {
    process(e)
  }
}

function process (e: OfflineAudioCompletionEvent) {
  const filteredBuffer = e.renderedBuffer
  // If you want to analyze both channels, use the other channel later
  const data = filteredBuffer.getChannelData(0)
  const max = arrayMax(data)
  const min = arrayMin(data)
  const threshold = min + (max - min) * 0.98
  const peaks = getPeaksAtThreshold(data, threshold)
  const intervalCounts = countIntervalsBetweenNearbyPeaks(peaks)
  const tempoCounts = groupNeighborsByTempo(intervalCounts)
  tempoCounts.sort(function (a, b) {
    return b.count - a.count
  })
  if (tempoCounts.length) {
    output.innerHTML = tempoCounts[0].tempo
  }
}

// http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/
function getPeaksAtThreshold (data: Float32Array, threshold: number) {
  const peaksArray = []
  const length = data.length
  for (let i = 0; i < length;) {
    if (data[i] > threshold) {
      peaksArray.push(i)
      // Skip forward ~ 1/4s to get past this peak.
      i += 10000
    }
    i++
  }
  return peaksArray
}

function countIntervalsBetweenNearbyPeaks (peaks: number[]) {
  const intervalCounts: IntervalCounts[] = []

  peaks.forEach(function (peak, index) {
    for (let i = 0; i < 10; i++) {
      const interval = peaks[index + i] - peak
      const foundInterval = intervalCounts.some(function (intervalCount) {
        if (intervalCount.interval === interval) return intervalCount.count++
      })
      // Additional checks to avoid infinite loops in later processing
      if (!isNaN(interval) && interval !== 0 && !foundInterval) {
        intervalCounts.push({
          interval,
          count: 1
        })
      }
    }
  })
  return intervalCounts
}

function groupNeighborsByTempo (intervalCounts: IntervalCounts[]) {
  const tempoCounts: {
    tempo: number;
    count: number;
  }[] = []

  intervalCounts.forEach(function (intervalCount) {
    // Convert an interval to tempo
    let theoreticalTempo = 60 / (intervalCount.interval / 44100)
    theoreticalTempo = Math.round(theoreticalTempo)
    if (theoreticalTempo === 0) {
      return
    }
    // Adjust the tempo to fit within the 90-180 BPM range
    while (theoreticalTempo < 90) theoreticalTempo *= 2
    while (theoreticalTempo > 180) theoreticalTempo /= 2

    const foundTempo = tempoCounts.some(function (tempoCount): number | undefined {
      const Tempo = tempoCount.count += intervalCount.count
      if (tempoCount.tempo === theoreticalTempo) return Tempo
    })
    if (!foundTempo) {
      tempoCounts.push({
        tempo: theoreticalTempo,
        count: intervalCount.count
      })
    }
  })
  return tempoCounts
}

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values
function arrayMin (arr: Float32Array) {
  let len = arr.length
  let min = Infinity
  while (len--) {
    if (arr[len] < min) {
      min = arr[len]
    }
  }
  return min
}

function arrayMax (arr: Float32Array) {
  let len = arr.length
  let max = -Infinity
  while (len--) {
    if (arr[len] > max) {
      max = arr[len]
    }
  }
  return max
}
