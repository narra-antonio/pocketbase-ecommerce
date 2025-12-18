/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const productsCollection = app.findCollectionByNameOrId("products");

  // Get categories for relationships
  const gamingLaptops = app.findFirstRecordByFilter("categories", `slug = "gaming-laptops"`);
  const businessLaptops = app.findFirstRecordByFilter("categories", `slug = "business-laptops"`);
  const ultrabooks = app.findFirstRecordByFilter("categories", `slug = "ultrabooks"`);
  const mobilePhones = app.findFirstRecordByFilter("categories", `slug = "mobile-phones"`);
  const tablets = app.findFirstRecordByFilter("categories", `slug = "tablets"`);

  // Unsplash search queries for tech products
  const unsplashQueries = [
    "gaming+laptop", "laptop+computer", "ultrabook", "smartphone",
    "smartwatch", "headphones", "wireless+earbuds", "bluetooth+speaker",
    "dslr+camera", "tablet+ipad", "mechanical+keyboard", "gaming+mouse",
    "monitor+display", "graphics+card", "processor+cpu", "motherboard"
  ];

  let productCount = 0;

  // ========================================
  // GAMING LAPTOPS (50 products)
  // ========================================
  const gamingBrands = ["ASUS ROG", "MSI", "Alienware", "Razer", "Acer Predator"];
  const gamingSpecs = [
    { cpu: "Intel i9-13900HX", gpu: "RTX 4090", ram: "32GB", storage: "2TB SSD" },
    { cpu: "AMD Ryzen 9 7945HX", gpu: "RTX 4080", ram: "32GB", storage: "1TB SSD" },
    { cpu: "Intel i7-13700HX", gpu: "RTX 4070", ram: "16GB", storage: "1TB SSD" },
    { cpu: "Intel i9-12900H", gpu: "RTX 4060", ram: "16GB", storage: "512GB SSD" },
    { cpu: "AMD Ryzen 7 7840HS", gpu: "RX 7600M XT", ram: "16GB", storage: "1TB SSD" }
  ];

  for (let i = 0; i < 50; i++) {
    const brand = gamingBrands[i % gamingBrands.length];
    const spec = gamingSpecs[i % gamingSpecs.length];
    const basePrice = 1299 + (i * 50);
    const comparePrice = basePrice + (Math.random() * 300);

    const product = new Record(productsCollection, {
      name: `${brand} Gaming Laptop ${spec.cpu} ${spec.gpu}`,
      slug: `gaming-laptop-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Powerful gaming laptop featuring ${spec.cpu} processor, NVIDIA ${spec.gpu} graphics card, ${spec.ram} DDR5 RAM, and ${spec.storage} NVMe storage. Perfect for AAA gaming and content creation. Features RGB keyboard, high refresh rate display, and advanced cooling system.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: gamingLaptops.id,
      image_url: `https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80&sig=${i}`
      ],
      stock: 10 + (i % 20),
      sku: `GLT-${brand.substring(0, 3).toUpperCase()}-${1000 + i}`,
      brand: brand,
      specifications: {
        processor: spec.cpu,
        graphics: spec.gpu,
        ram: spec.ram,
        storage: spec.storage,
        display: "15.6\" QHD 240Hz",
        os: "Windows 11 Pro",
        weight: "2.3kg",
        battery: "90Wh"
      },
      featured: i < 5,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // BUSINESS LAPTOPS (50 products)
  // ========================================
  const businessBrands = ["Dell Latitude", "HP EliteBook", "Lenovo ThinkPad", "Microsoft Surface", "ASUS ExpertBook"];
  const businessSpecs = [
    { cpu: "Intel i7-1365U", ram: "16GB", storage: "512GB SSD" },
    { cpu: "Intel i5-1335U", ram: "16GB", storage: "512GB SSD" },
    { cpu: "AMD Ryzen 7 PRO", ram: "32GB", storage: "1TB SSD" },
    { cpu: "Intel i7-1355U", ram: "32GB", storage: "1TB SSD" },
    { cpu: "Intel i5-1340P", ram: "16GB", storage: "256GB SSD" }
  ];

  for (let i = 0; i < 50; i++) {
    const brand = businessBrands[i % businessBrands.length];
    const spec = businessSpecs[i % businessSpecs.length];
    const basePrice = 899 + (i * 30);
    const comparePrice = basePrice + (Math.random() * 200);

    const product = new Record(productsCollection, {
      name: `${brand} Professional Laptop ${spec.cpu}`,
      slug: `business-laptop-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Professional business laptop with ${spec.cpu} processor, ${spec.ram} RAM, and ${spec.storage} storage. Features enterprise-grade security, long battery life, and durable build quality. Ideal for corporate environments and remote work.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: businessLaptops.id,
      image_url: `https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80&sig=${i}`
      ],
      stock: 15 + (i % 25),
      sku: `BLT-${brand.substring(0, 3).toUpperCase()}-${2000 + i}`,
      brand: brand,
      specifications: {
        processor: spec.cpu,
        ram: spec.ram,
        storage: spec.storage,
        display: "14\" FHD IPS",
        os: "Windows 11 Pro",
        weight: "1.4kg",
        battery: "65Wh",
        security: "TPM 2.0, Fingerprint"
      },
      featured: i < 3,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // ULTRABOOKS (50 products)
  // ========================================
  const ultrabookBrands = ["MacBook Air", "Dell XPS", "HP Spectre", "LG Gram", "Lenovo Yoga"];
  const ultrabookSpecs = [
    { cpu: "Apple M3", ram: "16GB", storage: "512GB SSD" },
    { cpu: "Intel i7-1360P", ram: "16GB", storage: "512GB SSD" },
    { cpu: "Apple M2", ram: "8GB", storage: "256GB SSD" },
    { cpu: "Intel i5-1340P", ram: "16GB", storage: "512GB SSD" },
    { cpu: "AMD Ryzen 7 7840U", ram: "16GB", storage: "1TB SSD" }
  ];

  for (let i = 0; i < 50; i++) {
    const brand = ultrabookBrands[i % ultrabookBrands.length];
    const spec = ultrabookSpecs[i % ultrabookSpecs.length];
    const basePrice = 1099 + (i * 40);
    const comparePrice = basePrice + (Math.random() * 250);

    const product = new Record(productsCollection, {
      name: `${brand} Ultrabook ${spec.cpu}`,
      slug: `ultrabook-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Premium ultrabook with ${spec.cpu} processor, ${spec.ram} unified memory, and ${spec.storage} storage. Ultra-thin and lightweight design with stunning display and all-day battery life. Perfect for professionals on the go.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: ultrabooks.id,
      image_url: `https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80&sig=${i}`
      ],
      stock: 12 + (i % 18),
      sku: `ULT-${brand.substring(0, 3).toUpperCase()}-${3000 + i}`,
      brand: brand,
      specifications: {
        processor: spec.cpu,
        ram: spec.ram,
        storage: spec.storage,
        display: "13.6\" Retina",
        os: brand.includes("MacBook") ? "macOS" : "Windows 11",
        weight: "1.2kg",
        battery: "52Wh"
      },
      featured: i < 5,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // SMARTPHONES (50 products)
  // ========================================
  const phoneBrands = ["iPhone 15", "Samsung Galaxy S24", "Google Pixel 8", "OnePlus 12", "Xiaomi 14"];
  const phoneSpecs = [
    { chip: "A17 Pro", ram: "8GB", storage: "256GB", camera: "48MP" },
    { chip: "Snapdragon 8 Gen 3", ram: "12GB", storage: "256GB", camera: "200MP" },
    { chip: "Google Tensor G3", ram: "12GB", storage: "128GB", camera: "50MP" },
    { chip: "Snapdragon 8 Gen 3", ram: "16GB", storage: "512GB", camera: "50MP" },
    { chip: "Snapdragon 8 Gen 3", ram: "12GB", storage: "512GB", camera: "50MP" }
  ];

  for (let i = 0; i < 50; i++) {
    const brand = phoneBrands[i % phoneBrands.length];
    const spec = phoneSpecs[i % phoneSpecs.length];
    const basePrice = 799 + (i * 20);
    const comparePrice = basePrice + (Math.random() * 150);

    const product = new Record(productsCollection, {
      name: `${brand} ${spec.storage}`,
      slug: `smartphone-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Flagship smartphone powered by ${spec.chip} chip with ${spec.ram} RAM and ${spec.storage} storage. Features ${spec.camera} main camera, stunning AMOLED display, and 5G connectivity. Premium design with advanced AI capabilities.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: mobilePhones.id,
      image_url: `https://images.unsplash.com/photo-1592286927505-31c6d2f9c9b2?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1592286927505-31c6d2f9c9b2?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&sig=${i}`
      ],
      stock: 20 + (i % 30),
      sku: `PHN-${brand.substring(0, 3).toUpperCase()}-${4000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        processor: spec.chip,
        ram: spec.ram,
        storage: spec.storage,
        display: "6.7\" AMOLED 120Hz",
        camera: spec.camera,
        battery: "5000mAh",
        os: brand.includes("iPhone") ? "iOS 17" : "Android 14"
      },
      featured: i < 10,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // TABLETS (50 products)
  // ========================================
  const tabletBrands = ["iPad Pro", "iPad Air", "Samsung Galaxy Tab S9", "Microsoft Surface Pro", "Lenovo Tab P12"];

  for (let i = 0; i < 50; i++) {
    const brand = tabletBrands[i % tabletBrands.length];
    const storage = ["128GB", "256GB", "512GB", "1TB"][i % 4];
    const basePrice = 599 + (i * 25);
    const comparePrice = basePrice + (Math.random() * 180);

    const product = new Record(productsCollection, {
      name: `${brand} ${storage}`,
      slug: `tablet-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Premium tablet with ${storage} storage, stunning display, and powerful performance. Perfect for creative work, entertainment, and productivity. Supports stylus input and keyboard accessories.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: tablets.id,
      image_url: `https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1585790050230-5dd28404f905?w=800&q=80&sig=${i}`
      ],
      stock: 15 + (i % 20),
      sku: `TAB-${brand.substring(0, 3).toUpperCase()}-${5000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        storage: storage,
        display: "12.9\" Liquid Retina",
        os: brand.includes("iPad") ? "iPadOS 17" : brand.includes("Surface") ? "Windows 11" : "Android 14",
        battery: "10,000mAh",
        weight: "650g"
      },
      featured: i < 5,
      active: true
    });
    app.save(product);
    productCount++;
  }

  console.log(`✅ Batch 1 seeded: ${productCount} products (Gaming Laptops, Business Laptops, Ultrabooks, Smartphones, Tablets)`);
}, (app) => {
  // Delete products with SKU starting with batch 1 prefixes
  const skuPrefixes = ["GLT-", "BLT-", "ULT-", "PHN-", "TAB-"];

  skuPrefixes.forEach(prefix => {
    try {
      const products = app.findRecordsByFilter("products", `sku ~ "${prefix}"`);
      products.forEach(product => app.deleteRecord(product));
    } catch (e) {
      console.log(`No products found with prefix ${prefix}`);
    }
  });

  console.log("🔄 Batch 1 rollback completed!");
});
