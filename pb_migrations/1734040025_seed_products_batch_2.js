/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const productsCollection = app.findCollectionByNameOrId("products");

  // Get categories for relationships
  const headphones = app.findFirstRecordByFilter("categories", `slug = "headphones"`);
  const earbuds = app.findFirstRecordByFilter("categories", `slug = "earbuds-in-ear"`);
  const speakers = app.findFirstRecordByFilter("categories", `slug = "speakers"`);
  const smartwatches = app.findFirstRecordByFilter("categories", `slug = "smartwatches"`);
  const dslrCameras = app.findFirstRecordByFilter("categories", `slug = "dslr-cameras"`);

  let productCount = 0;

  // ========================================
  // HEADPHONES (50 products)
  // ========================================
  const headphoneBrands = ["Sony WH-1000XM5", "Bose QuietComfort", "Sennheiser Momentum", "Apple AirPods Max", "Beats Studio Pro"];
  const headphoneTypes = ["Over-Ear", "On-Ear", "Wireless", "Noise Cancelling", "Studio"];

  for (let i = 0; i < 50; i++) {
    const brand = headphoneBrands[i % headphoneBrands.length];
    const type = headphoneTypes[i % headphoneTypes.length];
    const basePrice = 199 + (i * 10);
    const comparePrice = basePrice + (Math.random() * 100);

    const product = new Record(productsCollection, {
      name: `${brand} ${type} Headphones`,
      slug: `headphones-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Premium ${type.toLowerCase()} headphones with industry-leading noise cancellation, exceptional sound quality, and comfortable design. Features adaptive audio, multipoint connectivity, and up to 30 hours of battery life. Perfect for music lovers and professionals.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: headphones.id,
      image_url: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80&sig=${i}`
      ],
      stock: 25 + (i % 35),
      sku: `HDP-${brand.substring(0, 3).toUpperCase()}-${6000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        type: type,
        connectivity: "Bluetooth 5.3, 3.5mm jack",
        battery: "30 hours",
        charging: "USB-C fast charging",
        features: "Active Noise Cancellation, Transparency Mode",
        driver: "40mm dynamic",
        weight: "250g"
      },
      featured: i < 8,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // EARBUDS (50 products)
  // ========================================
  const earbudsBrands = ["Apple AirPods Pro 2", "Samsung Galaxy Buds3", "Sony WF-1000XM5", "Bose QuietComfort Earbuds", "Jabra Elite 10"];
  const earbudsFeatures = ["ANC", "Spatial Audio", "Hi-Res Audio", "Sport", "Gaming"];

  for (let i = 0; i < 50; i++) {
    const brand = earbudsBrands[i % earbudsBrands.length];
    const feature = earbudsFeatures[i % earbudsFeatures.length];
    const basePrice = 129 + (i * 8);
    const comparePrice = basePrice + (Math.random() * 80);

    const product = new Record(productsCollection, {
      name: `${brand} Wireless Earbuds ${feature}`,
      slug: `earbuds-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `True wireless earbuds with ${feature} technology, premium sound quality, and comfortable fit. Features adaptive noise cancellation, transparency mode, and wireless charging case. Perfect for daily commute, workouts, and calls.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: earbuds.id,
      image_url: `https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80&sig=${i}`
      ],
      stock: 30 + (i % 40),
      sku: `EBD-${brand.substring(0, 3).toUpperCase()}-${7000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        type: "In-Ear TWS",
        connectivity: "Bluetooth 5.3",
        battery: "6h earbuds + 24h case",
        charging: "USB-C, Wireless Qi",
        features: `${feature}, IPX4 water resistant`,
        driver: "11mm dynamic",
        weight: "5g per earbud"
      },
      featured: i < 10,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // SPEAKERS (50 products)
  // ========================================
  const speakerBrands = ["JBL Flip 6", "Sony SRS-XB43", "Bose SoundLink", "Ultimate Ears BOOM", "Marshall Emberton"];
  const speakerTypes = ["Portable", "Smart", "Party", "Outdoor", "Home"];

  for (let i = 0; i < 50; i++) {
    const brand = speakerBrands[i % speakerBrands.length];
    const type = speakerTypes[i % speakerTypes.length];
    const basePrice = 89 + (i * 7);
    const comparePrice = basePrice + (Math.random() * 60);

    const product = new Record(productsCollection, {
      name: `${brand} ${type} Bluetooth Speaker`,
      slug: `speaker-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `${type} Bluetooth speaker with powerful 360° sound, deep bass, and waterproof design. Features PartyBoost for multi-speaker pairing, 12+ hours battery life, and USB-C charging. Perfect for indoor and outdoor use.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: speakers.id,
      image_url: `https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80&sig=${i}`
      ],
      stock: 20 + (i % 30),
      sku: `SPK-${brand.substring(0, 3).toUpperCase()}-${8000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        type: type,
        connectivity: "Bluetooth 5.1",
        battery: "12 hours",
        charging: "USB-C",
        power: "30W RMS",
        features: "IPX7 waterproof, PartyBoost",
        weight: "550g"
      },
      featured: i < 6,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // SMARTWATCHES (50 products)
  // ========================================
  const smartwatchBrands = ["Apple Watch Series 9", "Samsung Galaxy Watch6", "Garmin Fenix 7", "Fitbit Sense 2", "Huawei Watch GT 4"];
  const watchSizes = ["41mm", "45mm", "42mm", "46mm", "44mm"];

  for (let i = 0; i < 50; i++) {
    const brand = smartwatchBrands[i % smartwatchBrands.length];
    const size = watchSizes[i % watchSizes.length];
    const basePrice = 299 + (i * 12);
    const comparePrice = basePrice + (Math.random() * 120);

    const product = new Record(productsCollection, {
      name: `${brand} ${size} GPS + Cellular`,
      slug: `smartwatch-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Advanced smartwatch with ${size} display, comprehensive health tracking, and cellular connectivity. Features heart rate monitoring, sleep tracking, ECG, blood oxygen measurement, and workout detection. Water resistant up to 50m.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: smartwatches.id,
      image_url: `https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80&sig=${i}`
      ],
      stock: 18 + (i % 25),
      sku: `SWT-${brand.substring(0, 3).toUpperCase()}-${9000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        size: size,
        display: "AMOLED Always-On",
        connectivity: "GPS, Cellular, Wi-Fi, Bluetooth",
        battery: "36 hours",
        sensors: "Heart Rate, ECG, SpO2, Gyroscope",
        waterproof: "50m",
        os: brand.includes("Apple") ? "watchOS 10" : brand.includes("Samsung") ? "Wear OS 4" : "Proprietary"
      },
      featured: i < 8,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // DSLR CAMERAS (50 products)
  // ========================================
  const cameraBrands = ["Canon EOS R5", "Nikon Z9", "Sony Alpha A7R V", "Fujifilm X-T5", "Panasonic Lumix S5 II"];
  const cameraTypes = ["Body Only", "Kit 24-70mm", "Kit 24-105mm", "Kit 18-55mm", "Professional"];

  for (let i = 0; i < 50; i++) {
    const brand = cameraBrands[i % cameraBrands.length];
    const type = cameraTypes[i % cameraTypes.length];
    const basePrice = 1899 + (i * 60);
    const comparePrice = basePrice + (Math.random() * 400);

    const product = new Record(productsCollection, {
      name: `${brand} Mirrorless Camera ${type}`,
      slug: `camera-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Professional mirrorless camera with full-frame sensor, advanced autofocus system, and 8K video recording. ${type} configuration perfect for photography and videography. Features image stabilization, dual card slots, and weather sealing.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: dslrCameras.id,
      image_url: `https://images.unsplash.com/photo-1606933248374-72a5838c8da4?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1606933248374-72a5838c8da4?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1606933542744-bb66e0e1920d?w=800&q=80&sig=${i}`
      ],
      stock: 8 + (i % 12),
      sku: `CAM-${brand.substring(0, 3).toUpperCase()}-${10000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        type: "Mirrorless Full-Frame",
        sensor: "45MP CMOS",
        video: "8K 30fps, 4K 120fps",
        autofocus: "693-point Hybrid AF",
        iso: "100-51200 (expandable)",
        stabilization: "5-axis IBIS",
        storage: "CFexpress + SD",
        weight: "738g (body only)"
      },
      featured: i < 5,
      active: true
    });
    app.save(product);
    productCount++;
  }

  console.log(`✅ Batch 2 seeded: ${productCount} products (Headphones, Earbuds, Speakers, Smartwatches, DSLR Cameras)`);

}, (app) => {
  // Delete products with SKU starting with batch 2 prefixes
  const skuPrefixes = ["HDP-", "EBD-", "SPK-", "SWT-", "CAM-"];

  skuPrefixes.forEach(prefix => {
    try {
      const products = app.findRecordsByFilter("products", `sku ~ "${prefix}"`);
      products.forEach(product => app.deleteRecord(product));
    } catch (e) {
      console.log(`No products found with prefix ${prefix}`);
    }
  });

  console.log("🔄 Batch 2 rollback completed!");
});
