/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  const productsCollection = app.findCollectionByNameOrId("products");
  console.log("🚀 Seeding products batch 4...", productsCollection);
  // Get categories for relationships
  const actionCameras = app.findFirstRecordByFilter("categories", `slug = "action-cameras"`);
  const lenses = app.findFirstRecordByFilter("categories", `slug = "camera-lenses"`);
  const gamingConsoles = app.findFirstRecordByFilter("categories", `slug = "gaming-consoles"`);
  const tvs = app.findFirstRecordByFilter("categories", `slug = "tvs-home-theater"`);
  const networking = app.findFirstRecordByFilter("categories", `slug = "networking"`);

  let productCount = 0;

  // ========================================
  // ACTION CAMERAS (50 products)
  // ========================================
  const actionCameraBrands = ["GoPro Hero 12", "DJI Osmo Action 4", "Insta360 X3", "Sony RX0 II", "Akaso Brave 7"];
  const actionEditions = ["Black", "Creator Edition", "Waterproof Bundle", "Adventure Kit", "Pro"];

  for (let i = 0; i < 50; i++) {
    const brand = actionCameraBrands[i % actionCameraBrands.length];
    const edition = actionEditions[i % actionEditions.length];
    const basePrice = 249 + (i * 15);
    const comparePrice = basePrice + (Math.random() * 120);

    const product = new Record(productsCollection, {
      name: `${brand} ${edition} Action Camera`,
      slug: `action-camera-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Rugged action camera with 5.3K video, advanced stabilization, and waterproof design up to 10m. Features voice control, live streaming, and TimeWarp 3.0. Includes mounting accessories and protective case. Perfect for adventure sports, vlogging, and travel.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: actionCameras.id,
      image_url: `https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1606941369985-cb0fa2a049e8?w=800&q=80&sig=${i}`
      ],
      stock: 20 + (i % 28),
      sku: `ACT-${brand.substring(0, 3).toUpperCase()}-${16000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        video: "5.3K 60fps, 4K 120fps",
        sensor: "27MP",
        stabilization: "HyperSmooth 6.0",
        waterproof: "10m (33ft)",
        screen: "2\" Touch + Front LCD",
        battery: "1720mAh",
        connectivity: "Wi-Fi, Bluetooth",
        weight: "153g"
      },
      featured: i < 6,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // CAMERA LENSES (50 products)
  // ========================================
  const lensBrands = ["Canon RF", "Nikon Z", "Sony FE", "Sigma Art", "Tamron"];
  const lensTypes = [
    { focal: "24-70mm f/2.8", type: "Standard Zoom" },
    { focal: "70-200mm f/2.8", type: "Telephoto Zoom" },
    { focal: "50mm f/1.8", type: "Prime" },
    { focal: "85mm f/1.4", type: "Portrait Prime" },
    { focal: "16-35mm f/2.8", type: "Wide Angle Zoom" }
  ];

  for (let i = 0; i < 50; i++) {
    const brand = lensBrands[i % lensBrands.length];
    const lens = lensTypes[i % lensTypes.length];
    const basePrice = 499 + (i * 40);
    const comparePrice = basePrice + (Math.random() * 300);

    const product = new Record(productsCollection, {
      name: `${brand} ${lens.focal} ${lens.type} Lens`,
      slug: `lens-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Professional ${lens.type.toLowerCase()} lens with ${lens.focal} focal length. Features fast aperture, optical image stabilization, and weather sealing. Superior optical quality with minimal distortion and chromatic aberration. Perfect for portraits, landscapes, and professional photography.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: lenses.id,
      image_url: `https://images.unsplash.com/photo-1606933887783-5f3b07b9649c?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1606933887783-5f3b07b9649c?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1606933248374-72a5838c8da4?w=800&q=80&sig=${i}`
      ],
      stock: 8 + (i % 12),
      sku: `LNS-${brand.substring(0, 3).toUpperCase()}-${17000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        focal_length: lens.focal,
        type: lens.type,
        mount: brand.includes("Canon") ? "RF" : brand.includes("Nikon") ? "Z" : brand.includes("Sony") ? "FE" : "Multi-Mount",
        stabilization: "Optical IS",
        min_focus: "0.38m",
        filter_size: "77mm",
        weather_sealing: "Yes",
        weight: "840g"
      },
      featured: i < 4,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // GAMING CONSOLES (50 products)
  // ========================================
  const consoles = [
    { name: "PlayStation 5", storage: "825GB", edition: "Standard" },
    { name: "PlayStation 5", storage: "825GB", edition: "Digital" },
    { name: "Xbox Series X", storage: "1TB", edition: "Standard" },
    { name: "Xbox Series S", storage: "512GB", edition: "Digital" },
    { name: "Nintendo Switch", storage: "32GB", edition: "OLED" }
  ];

  for (let i = 0; i < 50; i++) {
    const console = consoles[i % consoles.length];
    const bundle = i % 5 === 0 ? "Ultimate Bundle" : i % 3 === 0 ? "Game Bundle" : "Console Only";
    const basePrice = 299 + (i * 12);
    const comparePrice = basePrice + (Math.random() * 100);

    const product = new Record(productsCollection, {
      name: `${console.name} ${console.storage} ${console.edition} ${bundle}`,
      slug: `console-${console.name.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `Next-gen gaming console with ${console.storage} storage and ${console.edition.toLowerCase()} edition. ${bundle} configuration includes console, controller, and cables. Features ray tracing, 4K gaming, and ultra-fast SSD. Play thousands of games and access streaming services.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: gamingConsoles.id,
      image_url: `https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80&sig=${i}`
      ],
      stock: 12 + (i % 18),
      sku: `CON-${console.name.substring(0, 3).toUpperCase()}-${18000 + i}`,
      brand: console.name.split(' ')[0],
      specifications: {
        storage: console.storage,
        edition: console.edition,
        cpu: console.name.includes("PlayStation") ? "AMD Zen 2" : console.name.includes("Xbox") ? "AMD Zen 2" : "NVIDIA Custom Tegra",
        gpu: console.name.includes("PlayStation") ? "AMD RDNA 2" : console.name.includes("Xbox") ? "AMD RDNA 2" : "NVIDIA Maxwell",
        ray_tracing: console.name.includes("Switch") ? "No" : "Yes",
        resolution: console.name.includes("Series S") ? "1440p" : "4K",
        hdr: "Yes"
      },
      featured: i < 8,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // TVS & HOME THEATER (50 products)
  // ========================================
  const tvBrands = ["Samsung QN90D", "LG OLED C4", "Sony Bravia XR", "TCL Mini-LED", "Hisense U8K"];
  const tvSizes = ["55\"", "65\"", "75\"", "85\"", "77\""];

  for (let i = 0; i < 50; i++) {
    const brand = tvBrands[i % tvBrands.length];
    const size = tvSizes[i % tvSizes.length];
    const basePrice = 899 + (i * 50);
    const comparePrice = basePrice + (Math.random() * 400);

    const product = new Record(productsCollection, {
      name: `${brand} ${size} 4K Smart TV`,
      slug: `tv-${brand.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      description: `${size} 4K QLED/OLED Smart TV with quantum dot technology, Dolby Vision, and 120Hz refresh rate. Features AI upscaling, voice control, and built-in streaming apps. Ideal for movies, gaming, and sports. Includes wall mount and premium HDMI cables.`,
      price: basePrice,
      compare_at_price: comparePrice,
      category: tvs.id,
      image_url: `https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80&sig=${i}`,
      image_urls: [
        `https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80&sig=${i}`,
        `https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80&sig=${i}`
      ],
      stock: 8 + (i % 12),
      sku: `TVS-${brand.substring(0, 3).toUpperCase()}-${19000 + i}`,
      brand: brand.split(' ')[0],
      specifications: {
        size: size,
        resolution: "4K (3840x2160)",
        panel: brand.includes("OLED") ? "OLED" : "QLED/Mini-LED",
        refresh_rate: "120Hz",
        hdr: "Dolby Vision, HDR10+",
        smart_os: brand.includes("Samsung") ? "Tizen" : brand.includes("LG") ? "webOS" : "Google TV",
        ports: "4x HDMI 2.1, 3x USB, Optical",
        features: "VRR, ALLM, eARC"
      },
      featured: i < 5,
      active: true
    });
    app.save(product);
    productCount++;
  }

  // ========================================
  // NETWORKING (50 products)
  // ========================================
  const networkingTypes = [
    { type: "Wi-Fi 6E Router", brands: ["ASUS ROG Rapture", "Netgear Nighthawk", "TP-Link Archer AXE", "Linksys Hydra Pro", "Eero Pro 6E"] },
    { type: "Mesh System", brands: ["Google Nest WiFi Pro", "Amazon eero 6+", "TP-Link Deco XE75", "Netgear Orbi", "ASUS ZenWiFi"] },
    { type: "Network Switch", brands: ["Netgear GS308", "TP-Link TL-SG108", "Ubiquiti UniFi", "D-Link DGS-1008P", "TRENDnet TEG"] },
    { type: "Modem Router Combo", brands: ["Motorola MG8702", "Arris Surfboard", "Netgear Nighthawk CAX80", "TP-Link Archer CR1900", "ASUS CM-32"] },
    { type: "Range Extender", brands: ["TP-Link RE815XE", "Netgear EAX80", "Linksys RE9000", "D-Link DAP-X1870", "ASUS RP-AX58"] }
  ];

  networkingTypes.forEach((category, catIndex) => {
    for (let i = 0; i < 10; i++) {
      const brand = category.brands[i % category.brands.length];
      const basePrice = 99 + (catIndex * 40) + (i * 20);
      const comparePrice = basePrice + (Math.random() * 80);
      const product = new Record(productsCollection, {
        name: `${brand} ${category.type}`,
        slug: `network-${brand.toLowerCase().replace(/\s+/g, '-').replace("+", "plus")}-${catIndex}-${i + 1}`,
        description: `High-performance ${category.type.toLowerCase()} with Wi-Fi 6/6E support, advanced security features, and gigabit speeds. Features parental controls, QoS, and easy setup via mobile app. Perfect for homes, offices, and streaming 4K content across multiple devices.`,
        price: basePrice,
        compare_at_price: comparePrice,
        category: networking.id,
        image_url: `https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&q=80&sig=${catIndex}${i}`,
        image_urls: [
          `https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&q=80&sig=${catIndex}${i}`,
          `https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80&sig=${catIndex}${i}`
        ],
        stock: 18 + (i % 22),
        sku: `NET-${category.type.substring(0, 3).toUpperCase()}-${20000 + (catIndex * 10) + i}`,
        brand: brand.split(' ')[0],
        specifications: {
          type: category.type,
          standard: category.type.includes("6E") ? "Wi-Fi 6E (802.11ax)" : "Wi-Fi 6 (802.11ax)",
          speed: category.type.includes("Router") ? "AXE11000" : category.type.includes("Mesh") ? "AX5400" : "1Gbps",
          coverage: category.type.includes("Mesh") ? "6000 sq ft" : category.type.includes("Router") ? "3500 sq ft" : "N/A",
          ports: category.type.includes("Switch") ? "8x Gigabit" : "4x Gigabit LAN, 1x WAN",
          security: "WPA3, VPN support"
        },
        featured: i < 3,
        active: true
      });
      app.save(product);
      productCount++;
    }
  });

  console.log(`✅ Batch 4 (FINAL) seeded: ${productCount} products (Action Cameras, Camera Lenses, Gaming Consoles, TVs, Networking)`);
  console.log(`🎉 ALL PRODUCTS SEEDED! Total: 1000 products across 4 batches`);

}, (app) => {
  // Delete products with SKU starting with batch 4 prefixes
  const skuPrefixes = ["ACT-", "LNS-", "CON-", "TVS-", "NET-"];

  skuPrefixes.forEach(prefix => {
    try {
      const products = app.findRecordsByFilter("products", `sku ~ "${prefix}"`);
      products.forEach(product => app.deleteRecord(product));
    } catch (e) {
      console.log(`No products found with prefix ${prefix}`);
    }
  });

  console.log("🔄 Batch 4 rollback completed!");
});
