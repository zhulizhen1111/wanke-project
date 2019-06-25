export default function(value1, referList) {
  let value = parseFloat(value1)
  let {minIndex, maxIndex} = rangeIndex(0, referList.length - 1, referList, value)
  let length = referList[maxIndex].value - referList[minIndex].value
  let minColorArr = referList[minIndex].color.match(/[\d\w]{2}/g).map(i => parseInt(i, 16)) // 每个区间最小color对应色值（10进制) eg: [92, 172, 229]
  let maxColorArr = referList[maxIndex].color.match(/[\d\w]{2}/g).map(i => parseInt(i, 16))
  let coef = [] // 系数
  let vauleColorArr = [] //  当前value对应色值(10进制)
  for (let i = 0; i < 3; i++) {
    // 计算系数
    coef[i] = length === 0 ? 0 : (maxColorArr[i] - minColorArr[i]) / length
    // 计算温度色值（10进制）
    vauleColorArr[i] = parseInt((value - referList[minIndex].value) * parseFloat(coef[i]) + minColorArr[i])
  }
  return `rgb(${vauleColorArr.toString()})`
}

function rangeIndex(minIndex, maxIndex, referList, value) {
  // 采用二分法
  if (value < referList[minIndex].value) {
    
    return {
      minIndex: minIndex,
      maxIndex: minIndex
    }
  } else if (value > referList[maxIndex].value ) {
   
    return {
      minIndex: maxIndex,
      maxIndex: maxIndex
    }
  } else {
    if (maxIndex - minIndex === 1) {
      return {
        minIndex: minIndex,
        maxIndex: maxIndex
      }
    }
    let midIndex = Math.ceil((maxIndex - minIndex) / 2) + minIndex //向上取整
    if (value >= referList[midIndex].value){
      return rangeIndex(midIndex, maxIndex, referList, value)
    } else if (value < referList[midIndex].value){
      return rangeIndex(minIndex, midIndex, referList, value)
    }
  }
}
