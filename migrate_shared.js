const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URL_APPLICATION || 'mongodb+srv://daccibase:daccibase001@daccibase.wtddgkh.mongodb.net/APPLICATION?appName=DACCIBASE');
  
  const Product = mongoose.model('Product', new mongoose.Schema({ 
    productType: String, 
    productCategoryAssignments: [
      {
        category: mongoose.Schema.Types.ObjectId,
        subcategory: String,
        assignmentType: String
      }
    ]
  }, { collection: 'products', strict: false }));

  const sharedTypes = ['Polo Shirts', 'T-Shirts', 'Shorts', 'Caps', 'Tank Tops', 'Hoodies'];

  const products = await Product.find({ deletedAt: null }).lean();

  for (const p of products) {
    if (sharedTypes.includes(p.productType)) {
      const hasAll = p.productCategoryAssignments && p.productCategoryAssignments.some(a => a.assignmentType === 'all' && a.subcategory === p.productType);
      
      if (!hasAll) {
        await Product.updateOne(
          { _id: p._id },
          { 
            $push: { 
              productCategoryAssignments: {
                subcategory: p.productType,
                assignmentType: 'all'
              } 
            } 
          }
        );
        console.log(`Added 'all' assignment for product ${p._id} (${p.productType})`);
      }
    }
  }

  console.log('Migration completed.');
  await mongoose.disconnect();
}
run().catch(console.error);
