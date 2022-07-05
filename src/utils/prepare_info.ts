class PrepareInfo {
  public static formatArray(array: any[] | null) {
    // validate if array is empty
    if (array === null) {
      return null;
    } else {
      // validate if array have first element === ""
      if (array[0] === "") {
        // remove first element
        array.shift();
        return array;
      } else {
        return array;
      }
    }
  }
}

export default PrepareInfo;
