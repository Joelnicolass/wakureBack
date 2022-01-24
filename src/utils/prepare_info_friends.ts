class PrepareInfo {
  public static formatFriends(friends: any[] | null) {
    if (friends !== null) {
      if (friends !== undefined) {
        if (friends[0] === "") {
          friends = friends.shift();
        }
        return friends;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

export default PrepareInfo;
