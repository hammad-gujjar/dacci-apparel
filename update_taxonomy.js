const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGODB_URL_APPLICATION || 'mongodb+srv://daccibase:daccibase001@daccibase.wtddgkh.mongodb.net/APPLICATION?appName=DACCIBASE');
  
  const Category = mongoose.model('Category', new mongoose.Schema({ name: String, slug: String, types: [String] }, { collection: 'categories' }));

  const newTaxonomy = [
    { name: 'Golfwear', slug: 'golfwear', types: ['Polo Shirts', 'T-Shirts', 'Shorts', 'Skirts', 'Pants', 'Golf Gloves', 'Arm Sleeves', 'Golf Towels', 'Caps'] },
    { name: 'Teamwear', slug: 'teamwear', types: ['Soccer Uniforms', 'Basketball Uniforms', 'Baseball Uniforms', 'Football Uniform', 'Grass Hockey Uniforms'] },
    { name: 'Fitness Apparel', slug: 'fitness-apparel', types: ['Tank Tops', 'Compression Shirts', 'Shorts', 'T-Shirts', 'Leggings', 'Sports Bras'] },
    { name: 'Activewear', slug: 'activewear', types: ['Puffer Jackets', 'Hoodies', 'Sweatshirts', 'Quarter-Zip Pullovers', 'Track Pants'] },
    { name: 'Running Wear', slug: 'running-wear', types: ['Lightweight T-Shirts', 'Breathable Shorts', 'Windbreakers', 'Compression Tights', 'Long-Sleeve Running Shirts'] },
    { name: 'Training Wear', slug: 'training-wear', types: ['Moisture-Wicking Shorts', 'Singlets', 'Weightlifting Gloves', 'Stringers', 'Durable Training Pants'] }
  ];

  for (const catData of newTaxonomy) {
    let cat = await Category.findOne({ slug: catData.slug });
    if (!cat) {
      console.log('Creating', catData.name);
      await Category.create(catData);
    } else {
      console.log('Updating', catData.name);
      cat.types = catData.types;
      await cat.save();
    }
  }

  console.log('Taxonomy updated.');
  await mongoose.disconnect();
}
run().catch(console.error);
