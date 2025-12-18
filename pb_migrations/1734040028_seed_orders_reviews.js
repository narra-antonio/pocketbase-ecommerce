/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {

  // Helper function to generate order numbers
  const generateOrderNumber = (sequence) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const seq = String(sequence).padStart(4, '0');
    return `${year}${month}${day}-${seq}`;
  };

  // Get collections
  const usersCollection = app.findCollectionByNameOrId("_pb_users_auth_");
  const productsCollection = app.findCollectionByNameOrId("products");
  const ordersCollection = app.findCollectionByNameOrId("orders");
  const orderItemsCollection = app.findCollectionByNameOrId("order_items");
  const orderStatusHistoryCollection = app.findCollectionByNameOrId("order_status_history");
  const userAddressesCollection = app.findCollectionByNameOrId("user_addresses");
  const userPaymentMethodsCollection = app.findCollectionByNameOrId("user_payment_methods");
  const paymentMethodsCollection = app.findCollectionByNameOrId("dom_payment_methods");
  const reviewsCollection = app.findCollectionByNameOrId("product_reviews");

  // Get users
  const adminUser = app.findAuthRecordByEmail("_pb_users_auth_", "admin@ecommerce.local");
  const regularUser = app.findAuthRecordByEmail("_pb_users_auth_", "user@ecommerce.local");

  // Get payment method
  const paypalMethod = app.findFirstRecordByFilter("dom_payment_methods", `slug = "paypal"`);

  // Get some products
  const products = app.findRecordsByFilter("products", "active = true", "-created_at", 10);

  // ========================================
  // 1. CREATE USER ADDRESS
  // ========================================
  const userAddress = new Record(userAddressesCollection, {
    user: regularUser.id,
    address_type: "both",
    first_name: "Mario",
    last_name: "Rossi",
    company: null,
    street_address: "Via Roma, 123",
    apartment: "Interno 5",
    city: "Milano",
    postal_code: "20100",
    country: "IT",
    phone: "+39 333 9876543",
    is_default: true,
    created_by: regularUser.id,
    updated_by: regularUser.id
  });
  app.save(userAddress);

  // ========================================
  // 2. CREATE USER PAYMENT METHOD
  // ========================================
  const userPaymentMethod = new Record(userPaymentMethodsCollection, {
    user: regularUser.id,
    payment_method: paypalMethod.id,
    payment_data: {
      email: "mario.rossi@paypal.com",
      verified: true
    },
    nickname: "My PayPal Account",
    is_default: true,
    active: true
  });
  app.save(userPaymentMethod);

  // ========================================
  // 3. ORDER 1 - DELIVERED (with history)
  // ========================================
  const order1 = new Record(ordersCollection, {
    order_number: generateOrderNumber(1),
    user: regularUser.id,
    status: "delivered",
    subtotal: products[0].getFloat("price") * 2,
    discount_amount: 0,
    tax_amount: (products[0].getFloat("price") * 2) * 0.22,
    shipping_cost: 9.99,
    total: (products[0].getFloat("price") * 2) * 1.22 + 9.99,
    payment_method: paypalMethod.id,
    payment_status: "paid",
    paypal_order_id: `PAYPAL-${Date.now()}-001`,
    shipping_address: userAddress.id,
    billing_address: userAddress.id,
    tracking_number: "IT123456789",
    shipped_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    delivered_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: regularUser.id,
    updated_by: adminUser.id
  });
  app.save(order1);

  // Status history: pending → processing → paid → shipped → delivered
  const order1Status1 = new Record(orderStatusHistoryCollection, {
    order: order1.id,
    from_status: null,
    to_status: "pending",
    changed_by: regularUser.id,
    notes: "Order created"
  });
  app.save(order1Status1);

  const order1Status2 = new Record(orderStatusHistoryCollection, {
    order: order1.id,
    from_status: "pending",
    to_status: "processing",
    changed_by: adminUser.id,
    notes: "Order processing started"
  });
  app.save(order1Status2);

  const order1Status3 = new Record(orderStatusHistoryCollection, {
    order: order1.id,
    from_status: "processing",
    to_status: "paid",
    changed_by: adminUser.id,
    notes: "Payment confirmed"
  });
  app.save(order1Status3);

  const order1Status4 = new Record(orderStatusHistoryCollection, {
    order: order1.id,
    from_status: "paid",
    to_status: "shipped",
    changed_by: adminUser.id,
    notes: "Order shipped with tracking IT123456789"
  });
  app.save(order1Status4);

  const order1Status5 = new Record(orderStatusHistoryCollection, {
    order: order1.id,
    from_status: "shipped",
    to_status: "delivered",
    changed_by: adminUser.id,
    notes: "Order delivered successfully"
  });
  app.save(order1Status5);

  const order1Item = new Record(orderItemsCollection, {
    order: order1.id,
    product: products[0].id,
    product_name: products[0].getString("name"),
    product_sku: products[0].getString("sku"),
    unit_price: products[0].getFloat("price"),
    quantity: 2,
    discount_amount: 0,
    tax_amount: (products[0].getFloat("price") * 2) * 0.22,
    line_total: (products[0].getFloat("price") * 2) * 1.22
  });
  app.save(order1Item);

  // Review for delivered product
  const review1 = new Record(reviewsCollection, {
    product: products[0].id,
    user: regularUser.id,
    order: order1.id,
    rating: 5,
    title: "Excellent product!",
    comment: "Really satisfied with this purchase. Fast delivery and great quality.",
    status: "approved",
    verified_purchase: true,
    active: true,
    helpful_count: 3,
    not_helpful_count: 0,
    created_by: regularUser.id,
    updated_by: regularUser.id
  });
  app.save(review1);

  // ========================================
  // 4. ORDER 2 - SHIPPED (with history)
  // ========================================
  const order2 = new Record(ordersCollection, {
    order_number: generateOrderNumber(2),
    user: regularUser.id,
    status: "shipped",
    subtotal: products[1].getFloat("price") + products[2].getFloat("price"),
    discount_amount: 0,
    tax_amount: (products[1].getFloat("price") + products[2].getFloat("price")) * 0.22,
    shipping_cost: 9.99,
    total: (products[1].getFloat("price") + products[2].getFloat("price")) * 1.22 + 9.99,
    payment_method: paypalMethod.id,
    payment_status: "paid",
    paypal_order_id: `PAYPAL-${Date.now()}-002`,
    shipping_address: userAddress.id,
    billing_address: userAddress.id,
    tracking_number: "IT987654321",
    shipped_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    created_by: regularUser.id,
    updated_by: adminUser.id
  });
  app.save(order2);

  // Status history
  const order2Status1 = new Record(orderStatusHistoryCollection, {
    order: order2.id,
    from_status: null,
    to_status: "pending",
    changed_by: regularUser.id,
    notes: "Order created"
  });
  app.save(order2Status1);

  const order2Status2 = new Record(orderStatusHistoryCollection, {
    order: order2.id,
    from_status: "pending",
    to_status: "processing",
    changed_by: adminUser.id,
    notes: "Order processing started"
  });
  app.save(order2Status2);

  const order2Status3 = new Record(orderStatusHistoryCollection, {
    order: order2.id,
    from_status: "processing",
    to_status: "paid",
    changed_by: adminUser.id,
    notes: "Payment confirmed"
  });
  app.save(order2Status3);

  const order2Status4 = new Record(orderStatusHistoryCollection, {
    order: order2.id,
    from_status: "paid",
    to_status: "shipped",
    changed_by: adminUser.id,
    notes: "Order shipped with tracking IT987654321"
  });
  app.save(order2Status4);

  const order2Item1 = new Record(orderItemsCollection, {
    order: order2.id,
    product: products[1].id,
    product_name: products[1].getString("name"),
    product_sku: products[1].getString("sku"),
    unit_price: products[1].getFloat("price"),
    quantity: 1,
    discount_amount: 0,
    tax_amount: products[1].getFloat("price") * 0.22,
    line_total: products[1].getFloat("price") * 1.22
  });
  app.save(order2Item1);

  const order2Item2 = new Record(orderItemsCollection, {
    order: order2.id,
    product: products[2].id,
    product_name: products[2].getString("name"),
    product_sku: products[2].getString("sku"),
    unit_price: products[2].getFloat("price"),
    quantity: 1,
    discount_amount: 0,
    tax_amount: products[2].getFloat("price") * 0.22,
    line_total: products[2].getFloat("price") * 1.22
  });
  app.save(order2Item2);

  // ========================================
  // 5. ORDER 3 - PAID (with history)
  // ========================================
  const order3 = new Record(ordersCollection, {
    order_number: generateOrderNumber(3),
    user: regularUser.id,
    status: "paid",
    subtotal: products[3].getFloat("price") * 3,
    discount_amount: 0,
    tax_amount: (products[3].getFloat("price") * 3) * 0.22,
    shipping_cost: 9.99,
    total: (products[3].getFloat("price") * 3) * 1.22 + 9.99,
    payment_method: paypalMethod.id,
    payment_status: "paid",
    paypal_order_id: `PAYPAL-${Date.now()}-003`,
    shipping_address: userAddress.id,
    billing_address: userAddress.id,
    created_by: regularUser.id,
    updated_by: adminUser.id
  });
  app.save(order3);

  // Status history
  const order3Status1 = new Record(orderStatusHistoryCollection, {
    order: order3.id,
    from_status: null,
    to_status: "pending",
    changed_by: regularUser.id,
    notes: "Order created"
  });
  app.save(order3Status1);

  const order3Status2 = new Record(orderStatusHistoryCollection, {
    order: order3.id,
    from_status: "pending",
    to_status: "processing",
    changed_by: adminUser.id,
    notes: "Order processing started"
  });
  app.save(order3Status2);

  const order3Status3 = new Record(orderStatusHistoryCollection, {
    order: order3.id,
    from_status: "processing",
    to_status: "paid",
    changed_by: adminUser.id,
    notes: "Payment confirmed"
  });
  app.save(order3Status3);

  const order3Item = new Record(orderItemsCollection, {
    order: order3.id,
    product: products[3].id,
    product_name: products[3].getString("name"),
    product_sku: products[3].getString("sku"),
    unit_price: products[3].getFloat("price"),
    quantity: 3,
    discount_amount: 0,
    tax_amount: (products[3].getFloat("price") * 3) * 0.22,
    line_total: (products[3].getFloat("price") * 3) * 1.22
  });
  app.save(order3Item);

  // ========================================
  // 6. ORDER 4 - PROCESSING (with history)
  // ========================================
  const order4 = new Record(ordersCollection, {
    order_number: generateOrderNumber(4),
    user: regularUser.id,
    status: "processing",
    subtotal: products[4].getFloat("price") + products[5].getFloat("price"),
    discount_amount: 0,
    tax_amount: (products[4].getFloat("price") + products[5].getFloat("price")) * 0.22,
    shipping_cost: 9.99,
    total: (products[4].getFloat("price") + products[5].getFloat("price")) * 1.22 + 9.99,
    payment_method: paypalMethod.id,
    payment_status: "paid",
    paypal_order_id: `PAYPAL-${Date.now()}-004`,
    shipping_address: userAddress.id,
    billing_address: userAddress.id,
    created_by: regularUser.id,
    updated_by: adminUser.id
  });
  app.save(order4);

  // Status history
  const order4Status1 = new Record(orderStatusHistoryCollection, {
    order: order4.id,
    from_status: null,
    to_status: "pending",
    changed_by: regularUser.id,
    notes: "Order created"
  });
  app.save(order4Status1);

  const order4Status2 = new Record(orderStatusHistoryCollection, {
    order: order4.id,
    from_status: "pending",
    to_status: "processing",
    changed_by: adminUser.id,
    notes: "Order processing started"
  });
  app.save(order4Status2);

  const order4Item1 = new Record(orderItemsCollection, {
    order: order4.id,
    product: products[4].id,
    product_name: products[4].getString("name"),
    product_sku: products[4].getString("sku"),
    unit_price: products[4].getFloat("price"),
    quantity: 1,
    discount_amount: 0,
    tax_amount: products[4].getFloat("price") * 0.22,
    line_total: products[4].getFloat("price") * 1.22
  });
  app.save(order4Item1);

  const order4Item2 = new Record(orderItemsCollection, {
    order: order4.id,
    product: products[5].id,
    product_name: products[5].getString("name"),
    product_sku: products[5].getString("sku"),
    unit_price: products[5].getFloat("price"),
    quantity: 1,
    discount_amount: 0,
    tax_amount: products[5].getFloat("price") * 0.22,
    line_total: products[5].getFloat("price") * 1.22
  });
  app.save(order4Item2);

  // ========================================
  // 7. ORDER 5 - PENDING (with history)
  // ========================================
  const order5 = new Record(ordersCollection, {
    order_number: generateOrderNumber(5),
    user: regularUser.id,
    status: "pending",
    subtotal: products[6].getFloat("price"),
    discount_amount: 0,
    tax_amount: products[6].getFloat("price") * 0.22,
    shipping_cost: 9.99,
    total: products[6].getFloat("price") * 1.22 + 9.99,
    payment_method: paypalMethod.id,
    payment_status: "pending",
    shipping_address: userAddress.id,
    billing_address: userAddress.id,
    created_by: regularUser.id,
    updated_by: regularUser.id
  });
  app.save(order5);

  // Status history
  const order5Status1 = new Record(orderStatusHistoryCollection, {
    order: order5.id,
    from_status: null,
    to_status: "pending",
    changed_by: regularUser.id,
    notes: "Order created"
  });
  app.save(order5Status1);

  const order5Item = new Record(orderItemsCollection, {
    order: order5.id,
    product: products[6].id,
    product_name: products[6].getString("name"),
    product_sku: products[6].getString("sku"),
    unit_price: products[6].getFloat("price"),
    quantity: 1,
    discount_amount: 0,
    tax_amount: products[6].getFloat("price") * 0.22,
    line_total: products[6].getFloat("price") * 1.22
  });
  app.save(order5Item);

  console.log("✅ Orders and reviews seeded successfully!");
  console.log("💳 1 PayPal payment method saved");
  console.log("📦 5 orders created for user@ecommerce.local");
  console.log("📊 Status history tracked for all orders");
  console.log("⭐ 1 product review created");

}, (app) => {

  // Delete status history
  try {
    const statusHistory = app.findRecordsByFilter("order_status_history", "");
    statusHistory.forEach(status => app.deleteRecord(status));
  } catch (e) {
    console.log("Status history not found or already deleted");
  }

  // Delete reviews
  try {
    const regularUser = app.findAuthRecordByEmail("_pb_users_auth_", "user@ecommerce.local");
    const reviews = app.findRecordsByFilter("product_reviews", `user = "${regularUser.id}"`);
    reviews.forEach(review => app.deleteRecord(review));
  } catch (e) {
    console.log("Reviews not found or already deleted");
  }

  // Delete order items
  try {
    const orders = app.findRecordsByFilter("orders", "");
    orders.forEach(order => {
      const items = app.findRecordsByFilter("order_items", `order = "${order.id}"`);
      items.forEach(item => app.deleteRecord(item));
    });
  } catch (e) {
    console.log("Order items not found or already deleted");
  }

  // Delete orders
  try {
    const orders = app.findRecordsByFilter("orders", "");
    orders.forEach(order => app.deleteRecord(order));
  } catch (e) {
    console.log("Orders not found or already deleted");
  }

  // Delete payment methods
  try {
    const regularUser = app.findAuthRecordByEmail("_pb_users_auth_", "user@ecommerce.local");
    const paymentMethods = app.findRecordsByFilter("user_payment_methods", `user = "${regularUser.id}"`);
    paymentMethods.forEach(pm => app.deleteRecord(pm));
  } catch (e) {
    console.log("Payment methods not found or already deleted");
  }

  // Delete addresses
  try {
    const regularUser = app.findAuthRecordByEmail("_pb_users_auth_", "user@ecommerce.local");
    const addresses = app.findRecordsByFilter("user_addresses", `user = "${regularUser.id}"`);
    addresses.forEach(address => app.deleteRecord(address));
  } catch (e) {
    console.log("Addresses not found or already deleted");
  }

  console.log("🔄 Orders and reviews rollback completed!");
});
