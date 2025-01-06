

export function ScrollShiftCalc(list,index){

    var length_w  = list.length-1

    // (index/length_w)*65
    return Math.floor((index/length_w)*55)
}