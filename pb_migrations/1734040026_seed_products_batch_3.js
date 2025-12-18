/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const productsCollection = app.findCollectionByNameOrId("products");

  // Get categories for relationships
  const monitors = app.findFirstRecordByFilter("categories", `slug = "monitors"`);
  const computerAccessories = app.findFirstRecordByFilter("categories", `slug = "computer-accessories"`);
  const gamingAccessories = app.findFirstRecordByFilter("categories", `slug = "gaming-accessories"`);
  const mobileAccessories = app.findFirstRecordByFilter("categories", `slug = "mobile-accessories"`);
  const mirrorlessCameras = app.findFirstRecordByFilter("categories", `slug = "mirrorless-cameras"`);

  let productCount = 0;

  // ========================================
  // MONITORS (50 products)
  // ========================================
  const monitorBrands = ["Dell UltraSharp", "LG UltraGear", "ASUS ROG Swift", "Samsung Odyssey", "BenQ MOBIUZ"];
  const monitorSizes = ["24\"", "27\"", "32\"", "34\"", "49\""];
  const monitorTypes = ["4K IPS", "QHD 165Hz", "UltraWide", "Gaming 240Hz", "Professional"];

  for (let i = 0; i < 50; i++) {
    const brand = monitorBrands[i % monitorBrands.length];
    const size = monitorSizes[i % monitorSizes.length];
    const type = monitorTypes[i % monitorTypes.length];
    const basePrice = 299 + (i * 20);
    const comparePrice = basePrice + (Math.random() * 150);

    const product = new Record(productsCollection, {
      name: `${brand} ${size} ${type} Monitor`,
      slug: `monitor-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `${size} ${type} monitor with stunning color accuracy and smooth performance. Features HDR support, ergonomic stand with height adjustment, and multiple connectivity options including DisplayPort and HDMI. Perfect for gaming, creative work, and productivity.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: monitors.id,
      image_url: `https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800&q=80&sig=${i}`
      ],
      stock: 15 + (i % 20),
      sku: `MON-${brand.substring(0, 3).toUpperCase()}-${11000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        size: size,
        resolution: type.includes("4K") ? "3840x2160" : type.includes("QHD") ? "2560x1440" : "1920x1080",
        panel: "IPS",
        refresh_rate: type.includes("240Hz") ? "240Hz" : type.includes("165Hz") ? "165Hz" : "60Hz",
        response_time: "1ms",
        hdr: "HDR10",
        ports: "DisplayPort 1.4, HDMI 2.1, USB-C",
        features: "FreeSync/G-Sync, Flicker-Free"
      },
      featured: i < 7,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // COMPUTER ACCESSORIES (50 products)
  // ========================================
  const accessoryTypes = [
    { type: "Mechanical Keyboard", brands: ["Logitech MX Keys", "Keychron K8", "Corsair K70", "Razer BlackWidow", "SteelSeries Apex Pro"] },
    { type: "Gaming Mouse", brands: ["Logitech G Pro X", "Razer DeathAdder V3", "SteelSeries Rival 5", "Corsair Dark Core", "Glorious Model O"] },
    { type: "Webcam", brands: ["Logitech Brio 4K", "Razer Kiyo Pro", "Elgato Facecam", "Logitech StreamCam", "Microsoft LifeCam"] },
    { type: "USB Hub", brands: ["Anker PowerExpand", "CalDigit TS4", "Satechi Type-C", "HyperDrive", "Belkin Thunderbolt"] },
    { type: "External SSD", brands: ["Samsung T7", "SanDisk Extreme Pro", "Crucial X9", "WD My Passport", "Kingston XS2000"] }
  ];

  accessoryTypes.forEach((category, catIndex) => {
    for (let i = 0; i < 10; i++) {
      const brand = category.brands[i % category.brands.length];
      const basePrice = 49 + (catIndex * 30) + (i * 15);
      const comparePrice = basePrice + (Math.random() * 40);

      const product = new Record(productsCollection, {
        name: `${brand} ${category.type}`,
        slug: `accessory-${brand.toLowerCase().replace(/\s+/g, '-')}-${catIndex}-${i + 1}`,
        description: `Premium ${category.type.toLowerCase()} with professional-grade quality and durability. Features advanced technology for optimal performance, compatibility with Windows and Mac, and sleek modern design. Perfect for work, gaming, and content creation.`,
        price: basePrice,
        compare_at_price: comparePrice,
        category: computerAccessories.id,
        image_url: `https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80&sig=${catIndex}${i}`,
        image_urls: [
          `https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80&sig=${catIndex}${i}`,
          `https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=800&q=80&sig=${catIndex}${i}`
        ],
        stock: 25 + (i % 30),
        sku: `ACC-${category.type.substring(0, 3).toUpperCase()}-${12000 + (catIndex * 10) + i}`,
        brand: brand.split(' ')[0],
        specifications: {
          type: category.type,
          connectivity: category.type.includes("Keyboard") || category.type.includes("Mouse") ? "Wireless 2.4GHz, Bluetooth" : "USB-C, USB-A",
          compatibility: "Windows, Mac, Linux",
          warranty: "2 years"
        },
        featured: i < 2,
        active: true
      });
      app.save(product);
      productCount++;
    }
  });

  // ========================================
  // GAMING ACCESSORIES (50 products)
  // ========================================
  const gamingAccessoryTypes = [
    { type: "Gaming Controller", brands: ["Xbox Elite Series 2", "PlayStation DualSense Edge", "Razer Wolverine V2", "SCUF Instinct Pro", "8BitDo Pro 2"] },
    { type: "Gaming Headset", brands: ["SteelSeries Arctis Nova Pro", "HyperX Cloud Alpha", "Razer BlackShark V2", "Logitech G Pro X", "Corsair HS80"] },
    { type: "Gaming Chair", brands: ["Secretlab Titan Evo", "Herman Miller X Logitech", "Razer Iskur V2", "Noblechairs EPIC", "DXRacer Master"] },
    { type: "RGB Mouse Pad", brands: ["Razer Goliathus Extended", "SteelSeries QcK Prism", "Corsair MM700", "HyperX Fury Ultra", "ASUS ROG Balteus"] },
    { type: "Stream Deck", brands: ["Elgato Stream Deck XL", "Loupedeck Live S", "Razer Stream Controller", "ROCCAT Sense Ctrl", "GoXLR Mini"] }
  ];

  gamingAccessoryTypes.forEach((category, catIndex) => {
    for (let i = 0; i < 10; i++) {
      const brand = category.brands[i % category.brands.length];
      const basePrice = 79 + (catIndex * 50) + (i * 20);
      const comparePrice = basePrice + (Math.random() * 60);

      const product = new Record(productsCollection, {
        name: `${brand} ${category.type}`,
        slug: `gaming-${brand.toLowerCase().replace(/\s+/g, '-')}-${catIndex}-${i + 1}`,
        description: `Professional-grade ${category.type.toLowerCase()} designed for competitive gaming and streaming. Features customizable RGB lighting, premium materials, and advanced functionality. Compatible with PC, PlayStation, Xbox, and Nintendo Switch.`,
        price: basePrice,
        compare_at_price: comparePrice,
        category: gamingAccessories.id,
        image_url: `https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80&sig=${catIndex}${i}`,
        image_urls: [
          `https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80&sig=${catIndex}${i}`,
          `https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80&sig=${catIndex}${i}`
        ],
        stock: 20 + (i % 25),
        sku: `GAM-${category.type.substring(0, 3).toUpperCase()}-${13000 + (catIndex * 10) + i}`,
        brand: brand.split(' ')[0],
        specifications: {
          type: category.type,
          compatibility: "PC, PS5, Xbox Series X/S, Nintendo Switch",
          connectivity: category.type.includes("Chair") ? "N/A" : "Wireless/Wired",
          rgb: category.type.includes("Chair") ? "Optional" : "Customizable RGB",
          warranty: "2 years"
        },
        featured: i < 3,
        active: true
      });
      app.save(product);
      productCount++;
    }
  });

  // ========================================
  // MOBILE ACCESSORIES (50 products)
  // ========================================
  const mobileAccessoryTypes = [
    { type: "Phone Case", brands: ["OtterBox Defender", "Spigen Ultra Hybrid", "Apple Silicone", "Casetify Impact", "UAG Pathfinder"] },
    { type: "Screen Protector", brands: ["Belkin ScreenForce", "Spigen GlasTR", "amFilm Tempered Glass", "ESR Armorite", "ZAGG InvisibleShield"] },
    { type: "Wireless Charger", brands: ["Anker PowerWave", "Belkin BoostCharge", "Mophie 3-in-1", "Samsung Wireless Duo", "Apple MagSafe"] },
    { type: "Power Bank", brands: ["Anker PowerCore 20K", "RAVPower 30000mAh", "Belkin BoostCharge 10K", "Mophie Powerstation", "Zendure SuperMini"] },
    { type: "Car Mount", brands: ["iOttie Easy One Touch", "Belkin Car Vent Mount", "Scosche MagicMount", "RAM X-Grip", "Anker Magnetic Mount"] }
  ];

  mobileAccessoryTypes.forEach((category, catIndex) => {
    for (let i = 0; i < 10; i++) {
      const brand = category.brands[i % category.brands.length];
      const basePrice = 19 + (catIndex * 15) + (i * 8);
      const comparePrice = basePrice + (Math.random() * 25);

      const product = new Record(productsCollection, {
        name: `${brand} ${category.type}`,
        slug: `mobile-${brand.toLowerCase().replace(/\s+/g, '-')}-${catIndex}-${i + 1}`,
        description: `High-quality ${category.type.toLowerCase()} providing excellent protection and functionality for your smartphone. Features premium materials, precise fit, and easy installation. Compatible with iPhone and Android devices with wireless charging support.`,
        price: basePrice,
        compare_at_price: comparePrice,
        category: mobileAccessories.id,
        image_url: `https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80&sig=${catIndex}${i}`,
        image_urls: [
          `https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80&sig=${catIndex}${i}`,
          `https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80&sig=${catIndex}${i}`
        ],
        stock: 35 + (i % 40),
        sku: `MOB-${category.type.substring(0, 3).toUpperCase()}-${14000 + (catIndex * 10) + i}`,
        brand: brand.split(' ')[0],
        specifications: {
          type: category.type,
          compatibility: "iPhone 12-15, Samsung Galaxy, Google Pixel",
          material: category.type.includes("Case") ? "Polycarbonate/TPU" : category.type.includes("Protector") ? "Tempered Glass" : "Aluminum/Plastic",
          features: category.type.includes("Charger") || category.type.includes("Power") ? "Fast Charging, Qi-Compatible" : "Impact Resistant",
          warranty: "1 year"
        },
        featured: i < 2,
        active: true
      });
      app.save(product);
      productCount++;
    }
  });

  // ========================================
  // MIRRORLESS CAMERAS (50 products)
  // ========================================
  const mirrorlessBrands = ["Sony Alpha A6700", "Canon EOS R8", "Nikon Z fc", "Fujifilm X-S20", "OM System OM-1"];
  const cameraConfigs = ["Body Only", "Kit 16-50mm", "Kit 18-135mm", "Kit 24-70mm", "Kit 28-200mm"];

  for (let i = 0; i < 50; i++) {
    const brand = mirrorlessBrands[i % mirrorlessBrands.length];
    const config = cameraConfigs[i % cameraConfigs.length];
    const basePrice = 899 + (i * 45);
    const comparePrice = basePrice + (Math.random() * 350);

    const product = new Record(productsCollection, {
      name: `${brand} Mirrorless Camera ${config}`,
      slug: `mirrorless-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Compact mirrorless camera with APS-C sensor, advanced autofocus, and 4K video recording. ${config} configuration ideal for content creators, vloggers, and photography enthusiasts. Features in-body stabilization, flip screen, and intuitive controls.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: mirrorlessCameras.id,
      image_url: `https://images.unsplash.com/photo-1606933542744-bb66e0e1920d?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1606933542744-bb66e0e1920d?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1606933248374-72a5838c8da4?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1606933887783-5f3b07b9649c?w=800&q=80&sig=${i}`
      ],
      stock: 10 + (i % 15),
      sku: `MRL-${brand.substring(0, 3).toUpperCase()}-${15000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        type: "Mirrorless APS-C",
        sensor: "26MP CMOS",
        video: "4K 60fps",
        autofocus: "425-point Hybrid AF",
        iso: "100-32000",
        stabilization: "5-axis IBIS",
        screen: "3\" Flip Touch LCD",
        storage: "SD UHS-II",
        weight: "465g (body only)"
      },
      featured: i < 4,
      active: true
    });
    app.save(product);
    productCount++;
  }

  console.log(`✅ Batch 3 seeded: ${productCount} products (Monitors, Computer Accessories, Gaming Accessories, Mobile Accessories, Mirrorless Cameras)`);
}, (app) => {
  // Delete products with SKU starting with batch 3 prefixes
  const skuPrefixes = ["MON-", "ACC-", "GAM-", "MOB-", "MRL-"];

  skuPrefixes.forEach(prefix => {
    try {
      const products = app.findRecordsByFilter("products", `sku ~ "${prefix}"`);
      products.forEach(product => app.deleteRecord(product));
    } catch (e) {
      console.log(`No products found with prefix ${prefix}`);
    }
  });

  console.log("🔄 Batch 3 rollback completed!");
});
