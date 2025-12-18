/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {

  const categoriesCollection = app.findCollectionByNameOrId("categories");

  // ========================================
  // ROOT CATEGORIES
  // ========================================

  const electronics = new Record(categoriesCollection, {
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and accessories",
    image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
    active: true,
    sort_order: 1
  });
  app.save(electronics);

  const computers = new Record(categoriesCollection, {
    name: "Computers & Tablets",
    slug: "computers-tablets",
    description: "Laptops, desktops, tablets and accessories",
    image_url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800",
    active: true,
    sort_order: 2
  });
  app.save(computers);

  const smartphones = new Record(categoriesCollection, {
    name: "Smartphones & Wearables",
    slug: "smartphones-wearables",
    description: "Mobile phones, smartwatches and accessories",
    image_url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    active: true,
    sort_order: 3
  });
  app.save(smartphones);

  const audio = new Record(categoriesCollection, {
    name: "Audio & Headphones",
    slug: "audio-headphones",
    description: "Headphones, speakers, and audio equipment",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    active: true,
    sort_order: 4
  });
  app.save(audio);

  const cameras = new Record(categoriesCollection, {
    name: "Cameras & Photography",
    slug: "cameras-photography",
    description: "Digital cameras, lenses, and photography accessories",
    image_url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    active: true,
    sort_order: 5
  });
  app.save(cameras);

  const gaming = new Record(categoriesCollection, {
    name: "Gaming",
    slug: "gaming",
    description: "Gaming consoles, accessories, and equipment",
    image_url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800",
    active: true,
    sort_order: 6
  });
  app.save(gaming);

  const homeAppliances = new Record(categoriesCollection, {
    name: "Home Appliances",
    slug: "home-appliances",
    description: "Smart home devices and appliances",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    active: true,
    sort_order: 7
  });
  app.save(homeAppliances);

  // ========================================
  // ELECTRONICS SUBCATEGORIES
  // ========================================

  const tvs = new Record(categoriesCollection, {
    name: "TVs & Home Theater",
    slug: "tvs-home-theater",
    parent: electronics.id,
    description: "Smart TVs, projectors, and home theater systems",
    image_url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800",
    active: true,
    sort_order: 1
  });
  app.save(tvs);

  const networking = new Record(categoriesCollection, {
    name: "Networking",
    slug: "networking",
    parent: electronics.id,
    description: "Routers, modems, and network equipment",
    image_url: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800",
    active: true,
    sort_order: 2
  });
  app.save(networking);

  // ========================================
  // COMPUTERS SUBCATEGORIES
  // ========================================

  const laptops = new Record(categoriesCollection, {
    name: "Laptops",
    slug: "laptops",
    parent: computers.id,
    description: "Portable computers for work and entertainment",
    image_url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    active: true,
    sort_order: 1
  });
  app.save(laptops);

  const desktops = new Record(categoriesCollection, {
    name: "Desktops",
    slug: "desktops",
    parent: computers.id,
    description: "Desktop computers and workstations",
    image_url: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800",
    active: true,
    sort_order: 2
  });
  app.save(desktops);

  const tablets = new Record(categoriesCollection, {
    name: "Tablets",
    slug: "tablets",
    parent: computers.id,
    description: "iPads, Android tablets, and accessories",
    image_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    active: true,
    sort_order: 3
  });
  app.save(tablets);

  const monitors = new Record(categoriesCollection, {
    name: "Monitors",
    slug: "monitors",
    parent: computers.id,
    description: "Computer displays and screens",
    image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800",
    active: true,
    sort_order: 4
  });
  app.save(monitors);

  const computerAccessories = new Record(categoriesCollection, {
    name: "Computer Accessories",
    slug: "computer-accessories",
    parent: computers.id,
    description: "Keyboards, mice, webcams, and more",
    image_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    active: true,
    sort_order: 5
  });
  app.save(computerAccessories);

  // ========================================
  // LAPTOPS SUBCATEGORIES (3rd level)
  // ========================================

  const gamingLaptops = new Record(categoriesCollection, {
    name: "Gaming Laptops",
    slug: "gaming-laptops",
    parent: laptops.id,
    description: "High-performance laptops for gaming",
    image_url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800",
    active: true,
    sort_order: 1
  });
  app.save(gamingLaptops);

  const businessLaptops = new Record(categoriesCollection, {
    name: "Business Laptops",
    slug: "business-laptops",
    parent: laptops.id,
    description: "Professional laptops for work",
    image_url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
    active: true,
    sort_order: 2
  });
  app.save(businessLaptops);

  const ultrabooks = new Record(categoriesCollection, {
    name: "Ultrabooks",
    slug: "ultrabooks",
    parent: laptops.id,
    description: "Thin and light premium laptops",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    active: true,
    sort_order: 3
  });
  app.save(ultrabooks);

  // ========================================
  // SMARTPHONES SUBCATEGORIES
  // ========================================

  const mobilePhones = new Record(categoriesCollection, {
    name: "Mobile Phones",
    slug: "mobile-phones",
    parent: smartphones.id,
    description: "Smartphones and feature phones",
    image_url: "https://images.unsplash.com/photo-1592286927505-31c6d2f9c9b2?w=800",
    active: true,
    sort_order: 1
  });
  app.save(mobilePhones);

  const smartwatches = new Record(categoriesCollection, {
    name: "Smartwatches",
    slug: "smartwatches",
    parent: smartphones.id,
    description: "Wearable smart devices",
    image_url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800",
    active: true,
    sort_order: 2
  });
  app.save(smartwatches);

  const mobileAccessories = new Record(categoriesCollection, {
    name: "Mobile Accessories",
    slug: "mobile-accessories",
    parent: smartphones.id,
    description: "Cases, chargers, and mobile accessories",
    image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800",
    active: true,
    sort_order: 3
  });
  app.save(mobileAccessories);

  // ========================================
  // AUDIO SUBCATEGORIES
  // ========================================

  const headphones = new Record(categoriesCollection, {
    name: "Headphones",
    slug: "headphones",
    parent: audio.id,
    description: "Over-ear, on-ear, and in-ear headphones",
    image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800",
    active: true,
    sort_order: 1
  });
  app.save(headphones);

  const earbuds = new Record(categoriesCollection, {
    name: "Earbuds & In-Ear",
    slug: "earbuds-in-ear",
    parent: audio.id,
    description: "Wireless and wired earbuds",
    image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
    active: true,
    sort_order: 2
  });
  app.save(earbuds);

  const speakers = new Record(categoriesCollection, {
    name: "Speakers",
    slug: "speakers",
    parent: audio.id,
    description: "Bluetooth speakers and home audio",
    image_url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
    active: true,
    sort_order: 3
  });
  app.save(speakers);

  // ========================================
  // CAMERAS SUBCATEGORIES
  // ========================================

  const dslrCameras = new Record(categoriesCollection, {
    name: "DSLR Cameras",
    slug: "dslr-cameras",
    parent: cameras.id,
    description: "Digital single-lens reflex cameras",
    image_url: "https://images.unsplash.com/photo-1606933248374-72a5838c8da4?w=800",
    active: true,
    sort_order: 1
  });
  app.save(dslrCameras);

  const mirrorlessCameras = new Record(categoriesCollection, {
    name: "Mirrorless Cameras",
    slug: "mirrorless-cameras",
    parent: cameras.id,
    description: "Compact system cameras",
    image_url: "https://images.unsplash.com/photo-1606933542744-bb66e0e1920d?w=800",
    active: true,
    sort_order: 2
  });
  app.save(mirrorlessCameras);

  const actionCameras = new Record(categoriesCollection, {
    name: "Action Cameras",
    slug: "action-cameras",
    parent: cameras.id,
    description: "GoPro and action cameras",
    image_url: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800",
    active: true,
    sort_order: 3
  });
  app.save(actionCameras);

  const lenses = new Record(categoriesCollection, {
    name: "Camera Lenses",
    slug: "camera-lenses",
    parent: cameras.id,
    description: "Interchangeable camera lenses",
    image_url: "https://images.unsplash.com/photo-1606933887783-5f3b07b9649c?w=800",
    active: true,
    sort_order: 4
  });
  app.save(lenses);

  // ========================================
  // GAMING SUBCATEGORIES
  // ========================================

  const gamingConsoles = new Record(categoriesCollection, {
    name: "Gaming Consoles",
    slug: "gaming-consoles",
    parent: gaming.id,
    description: "PlayStation, Xbox, Nintendo Switch",
    image_url: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800",
    active: true,
    sort_order: 1
  });
  app.save(gamingConsoles);

  const gamingAccessories = new Record(categoriesCollection, {
    name: "Gaming Accessories",
    slug: "gaming-accessories",
    parent: gaming.id,
    description: "Controllers, headsets, and gaming gear",
    image_url: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800",
    active: true,
    sort_order: 2
  });
  app.save(gamingAccessories);
  const cats = app.findCachedCollectionByNameOrId("categories");
  console.log("✅ Categories seeded successfully!");
  console.log(`📂 Total categories: ${cats.length}`);
  console.log("📋 Category List:",);
  //cats.forEach(cat => console.log(cat.description));

}, (app) => {
  // Delete all categories (cascades will handle relationships)
  const allCategories = app.findRecordsByFilter("categories", "");
  allCategories.forEach(category => {
    app.deleteRecord(category);
  });

  console.log("🔄 Categories rollback completed!");
});
