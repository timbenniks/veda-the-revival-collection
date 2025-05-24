"use client";

import React, { useState } from "react";
import { LiteClient, liteClient } from "algoliasearch/lite";

import { SearchBox, Hits, RefinementList } from "react-instantsearch";

import { InstantSearchNext } from "react-instantsearch-nextjs";

import { MegaMenu as MegaMenuProps } from "@/types/types";
import MegaMenu from "@/components/MegaMenu";
import Breadcrumb from "@/components/Breadcrumb";
interface AlgoliaSearchProps {
  header?: MegaMenuProps;
}

const searchClient: LiteClient = liteClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);

function Hit({ hit }: { hit: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-medium text-lg">{hit.title}</h3>
    </div>
  );
}

export default function AlgoliaSearch({ header }: AlgoliaSearchProps) {
  const [facetFilters] = useState([
    { attribute: "product_line", label: "Product Line" },
    { attribute: "materials", label: "Materials" },
    { attribute: "category", label: "Category" },
  ]);

  const breadcrumbLinks = [
    { title: "Home", url: "/" },
    { title: "Products", url: "/products" },
  ];

  return (
    <>
      {header && (
        <MegaMenu header={header.header} product_lines={header.product_lines} />
      )}

      <Breadcrumb links={breadcrumbLinks} />

      <div className="container mx-auto px-4 py-8">
        <InstantSearchNext searchClient={searchClient} indexName="products">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-64 shrink-0">
              {facetFilters.map((facet) => (
                <div key={facet.attribute} className="mb-6">
                  <h4 className="font-medium text-lg mb-2">{facet.label}</h4>
                  <RefinementList
                    attribute={facet.attribute}
                    classNames={{ root: "text-sm" }}
                  />
                </div>
              ))}
            </aside>
            <main className="flex-1">
              <SearchBox
                placeholder="Search products..."
                classNames={{
                  root: "w-full mb-6",
                  form: "p-2 border rounded",
                }}
              />
              <Hits
                hitComponent={Hit}
                classNames={{
                  root: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                }}
              />
            </main>
          </div>
        </InstantSearchNext>
      </div>
    </>
  );
}
