function makeFriendsList(friends) {
  const friendsList = document.createElement('ul');
  friendsList.innerHTML = friends.map(friend => `<li>${friend.firstName} ${friend.lastName}</li>`).join('');

  return friendsList;
}
