import ProductDetailsPage from '@/components/products/ProductDetailsPage';
import { productsData } from '@/data/products-complete';

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const product = productsData.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${product.title} - GearX Bangladesh`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
  };
}

export default function ProductPage({ params }) {
  return <ProductDetailsPage slug={params.slug} />;
}
