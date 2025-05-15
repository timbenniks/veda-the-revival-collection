import { NextRequest, NextResponse } from 'next/server';
import Personalize from '@contentstack/personalize-edge-sdk';
import { getPersonalizeInstance } from '@/lib/helpers';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export default async function middleware(request: NextRequest) {
  const personalizeSdk = await getPersonalizeInstance({ request });
  const variantParam = personalizeSdk?.getVariantParam();
  const parsedUrl = new URL(request.url);

  if (variantParam) {
    parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);
  }

  const response = NextResponse.rewrite(parsedUrl);

  await personalizeSdk?.addStateToResponse(response)

  return response;
}