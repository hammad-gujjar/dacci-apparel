const mongoose = require('mongoose');

async function main() {
  const ApplicationDB = await mongoose.createConnection('mongodb+srv://hammadgujjar088:W8N2qU2hH2eUj5p@dacciapparel.fcd3v.mongodb.net/application?retryWrites=true&w=majority');
  const UsersDB = await mongoose.createConnection('mongodb+srv://hammadgujjar088:W8N2qU2hH2eUj5p@dacciapparel.fcd3v.mongodb.net/users?retryWrites=true&w=majority');

  const Review = ApplicationDB.model('Review', new mongoose.Schema({ product: mongoose.Schema.Types.ObjectId, user: mongoose.Schema.Types.ObjectId }), 'reviews');
  const User = UsersDB.model('User', new mongoose.Schema({ name: String, image: String }), 'users');

  const rawReviews = await Review.find({ deletedAt: null }).limit(2).lean();
  console.log("Raw reviews count:", rawReviews.length);
  
  const userIds = rawReviews.map(r => r.user).filter(Boolean);
  console.log("User IDs from reviews:", userIds);

  const users = await User.find({ _id: { $in: userIds } }).lean();
  console.log("Found users count:", users.length);
  console.log("Found users:", users);

  const mappedReviews = rawReviews.map((rev) => ({
    ...rev,
    user: users.find(u => u._id.toString() === rev.user?.toString()) || null
  }));

  console.log("Mapped Reviews User field:");
  mappedReviews.forEach(r => console.log(r.user));

  ApplicationDB.close();
  UsersDB.close();
}

main().catch(console.error);
