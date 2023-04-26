// Returns a new array with the contents of the original array shuffled
// Does not modify the original array
export const shuffleArray = <ArrayType extends any>(
  arr: ArrayType[]
): ArrayType[] => {
  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    const newIndex = Math.floor(Math.random() * newArr.length);

    const temp = newArr[i];
    newArr[i] = newArr[newIndex];
    newArr[newIndex] = temp;
  }

  return newArr;
};
