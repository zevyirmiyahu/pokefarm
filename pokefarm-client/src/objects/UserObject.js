class UserObject {
  constructor(userId, username, password, email, money, isNewUser = true) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.email = email;
    this.money = money;
    this.isNewUser = isNewUser; // Determines which content we show user, StartContent or MainContent
  }
}

export default UserObject;
