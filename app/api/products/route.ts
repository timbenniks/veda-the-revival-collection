import contentstack from '@contentstack/delivery-sdk';
import { contentstackRegion } from '@/lib/helpers';
import { Product } from '@/types/types';

const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: contentstackRegion,
});

export async function GET() {
  try {
    const result = await stack
      .contentType('product')
      .entry()
      .includeReference(['category', 'product_line'])
      .addParams({ include_all: true })
      .addParams({ include_all_depth: 1 })
      .find<Product>();

    if (!result.entries || result.entries.length === 0) {
      return Response.json({ message: 'No products found' }, { status: 404 });
    }

    const products = result.entries.map((product: Product) => {
      const materials = product.taxonomies
        ?.filter((taxonomy) => taxonomy?.taxonomy_uid === "materials")
        .map((taxonomy) => taxonomy?.term_uid);

      const media = product.media && product.media?.[0]?.url;

      return {
        objectID: product.uid,
        title: product.title,
        url: product.url,
        description: product.description,
        short_description: product.description,
        media: media && `https://res.cloudinary.com/dwfcofnrd/image/fetch/f_auto,q_auto/w_700,h_700,c_auto,g_auto/${product.media?.[0]?.url}`,
        price: product.price || null,
        category: product.category?.[0]?.title || null,
        product_line: product.product_line?.[0]?.title || null,
        materials
      }
    })


    return Response.json({ products }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return Response.json({ message: 'Error fetching products', error: error.message }, { status: 500 });
  }
}
