import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCollectionBySlug, getProductsByCollection } from "@/lib/data"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function CollectionProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)
  const products = getProductsByCollection(slug)

  if (!collection) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Collection Header */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{collection.name}</h1>
            <p className="text-lg md:text-xl text-muted-foreground">{collection.description}</p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id}>
                <Card className="group overflow-hidden border-border/50 hover:border-foreground/20 transition-all duration-300">
                  <Link href={`/collections/${slug}/${product.id}`}>
                    <div className="relative overflow-hidden aspect-square cursor-pointer">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-balance">{product.name}</h3>
                      <p className="text-xl font-bold mt-2">{product.price}</p>
                    </div>
                    <Link href={`/collections/${slug}/${product.id}`}>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
