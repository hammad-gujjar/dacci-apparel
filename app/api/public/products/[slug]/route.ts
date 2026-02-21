import { databaseConnection } from "@/lib/databseconnection";
import { Product } from "@/models/product.model";
import { ProductVariant } from "@/models/productVariant.model";
import { Review } from "@/models/review.model";
import { Category } from "@/models/category.model";
import { Media } from "@/models/Media.model";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await databaseConnection();
    const { slug } = await params;

    const product = await Product.findOne({ slug, deletedAt: null })
      .populate("media", "secure_url")
      .populate("category", "name slug")
      .lean();

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // Fetch related data in parallel
    const [variants, reviews, relatedProducts] = await Promise.all([
      ProductVariant.find({ product: product._id, deletedAt: null })
        .populate("media", "secure_url")
        .lean(),
      Review.find({ product: product._id, deletedAt: null })
        .populate("user", "name image")
        .lean(),
      Product.find({
        category: product.category._id,
        _id: { $ne: product._id },
        deletedAt: null,
      })
        .limit(4)
        .populate("media", "secure_url")
        .lean(),
    ]);

    // Calculate Average Rating
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
        : 0;

    return NextResponse.json({
      success: true,
      data: {
        ...product,
        variants,
        reviews,
        averageRating,
        relatedProducts,
      },
    });
  } catch (err: any) {
    console.error("Single product fetch error:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
