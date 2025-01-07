export function moveStringByValue(array, value, toIndex) {
    const fromIndex = array.indexOf(value); // Find the current index of the value
    if (fromIndex === -1) {
      throw new Error(`Value "${value}" not found in the array.`);
    }
  
    if (fromIndex === toIndex) return array; // No need to move if already in the right position
  
    const item = array.splice(fromIndex, 1)[0]; // Remove the item by its index
    array.splice(toIndex, 0, item); // Insert the item at the new index
    return array;
  }