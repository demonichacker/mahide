const SEED_TOKEN = "seed-mahide-2026";

async function seedProducts() {
  console.log("🌱 Seeding products to MongoDB...\n");

  try {
    const response = await fetch("http://localhost:3000/api/admin/seed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: SEED_TOKEN,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`❌ Seeding failed: ${error.error}`);
      return;
    }

    const result = await response.json();
    console.log(`✅ ${result.message}`);
    console.log(`📊 Total products: ${result.count}`);
    console.log("\n🎉 All products are now in the database!");
    console.log("Visit http://localhost:3000/admin to manage them.");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

seedProducts();
