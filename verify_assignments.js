const mongoose = require('mongoose');
async function run() {
  await mongoose.connect(process.env.MONGODB_URL_APPLICATION || 'mongodb+srv://daccibase:daccibase001@daccibase.wtddgkh.mongodb.net/APPLICATION?appName=DACCIBASE');
  const Product = mongoose.model('Product', new mongoose.Schema({ productCategoryAssignments: [mongoose.Schema.Types.Mixed] }, { collection: 'products', strict: false }));
  const cnt = await Product.countDocuments({ productCategoryAssignments: { $exists: true, $not: { $size: 0 } } });
  console.log('Products with assignments:', cnt);
  await mongoose.disconnect();
}
run();
