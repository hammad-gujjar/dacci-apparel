const mongoose = require('mongoose');
const fs = require('fs');

async function run() {
  await mongoose.connect(process.env.MONGODB_URL_APPLICATION || 'mongodb+srv://daccibase:daccibase001@daccibase.wtddgkh.mongodb.net/APPLICATION?appName=DACCIBASE');
  
  const Category = mongoose.model('Category', new mongoose.Schema({ name: String, slug: String, types: [String] }, { collection: 'categories' }));
  const Product = mongoose.model('Product', new mongoose.Schema({ 
    name: String, 
    slug: String, 
    category: mongoose.Schema.Types.ObjectId, 
    productType: String, 
    tags: [String],
    productCategoryAssignments: [mongoose.Schema.Types.Mixed]
  }, { collection: 'products', strict: false }));

  const products = await Product.find({ deletedAt: null }).lean();
  
  let md = '# Pre-Phase 21-1 Product Mapping\n\n';
  md += `Total Unique Products: ${products.length}\n\n`;
  
  md += '| Product ID | Name | Slug | Category ID | Product Type | Tags | Assignments |\n';
  md += '|---|---|---|---|---|---|---|\n';
  
  for (const p of products) {
    const tags = p.tags ? p.tags.join(', ') : '';
    const assignments = p.productCategoryAssignments ? JSON.stringify(p.productCategoryAssignments) : 'None';
    md += `| ${p._id} | ${p.name} | ${p.slug} | ${p.category} | ${p.productType} | ${tags} | ${assignments} |\n`;
  }

  fs.writeFileSync('docs/product-mapping-before-phase-21-1.md', md, 'utf-8');
  console.log('Report generated at docs/product-mapping-before-phase-21-1.md');
  console.log(`Total Products: ${products.length}`);

  await mongoose.disconnect();
}

run().catch(console.error);
