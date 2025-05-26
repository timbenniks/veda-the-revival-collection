"use client";

import React, { useState } from "react";
import { LiteClient, liteClient } from "algoliasearch/lite";
import {
  SearchBox,
  Hits,
  RefinementList,
  Configure,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { MegaMenu as MegaMenuProps } from "@/types/types";
import MegaMenu from "@/components/MegaMenu";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "./cards/product";
interface AlgoliaSearchProps {
  header?: MegaMenuProps;
}

const searchClient: LiteClient = liteClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
);

function Hit({ hit }: { hit: any }) {
  return <ProductCard product={hit} algolia={true} as="div" />;
}

export default function AlgoliaSearch({ header }: AlgoliaSearchProps) {
  const [facetFilters] = useState([
    { attribute: "product_line", label: "Product Line" },
    { attribute: "materials", label: "Materials" },
    { attribute: "category", label: "Category" },
  ]);
  const [showFilters, setShowFilters] = useState(false);

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

      <div className="mx-auto p-4 pt-8 bg-white">
        <InstantSearchNext searchClient={searchClient} indexName="products">
          <div className="flex flex-col md:flex-row gap-10">
            <button
              className="md:hidden mb-4 px-4 py-2 border border-[#3b2e1e] rounded text-[#3b2e1e] font-light"
              onClick={() => setShowFilters((v) => !v)}
              aria-label="Toggle filters"
            >
              Show Filters
            </button>

            <aside
              className={`
                w-full md:w-64 shrink-0
                ${showFilters ? "block" : "hidden"} md:block
              `}
            >
              {facetFilters.map((facet) => (
                <div key={facet.attribute} className="mb-6">
                  <h4 className="font-light uppercase text-lg mb-2">
                    {facet.label}
                  </h4>
                  <RefinementList
                    attribute={facet.attribute}
                    sortBy={["name"]}
                    classNames={{
                      root: "text-sm",
                      item: "mb-1",
                      label: "flex w-full cursor-pointer font-light",
                      checkbox: "mr-1",
                      count:
                        "ml-2 bg-[#e9e9e9] items-center justify-center text-xs rounded-full font-light h-4 px-1 space-x-1 relative top-[3px]",
                    }}
                  />
                </div>
              ))}
            </aside>
            <main className="flex-1 ">
              <Configure hitsPerPage={100} />
              {/* <SearchBox
                placeholder="Search products..."
                classNames={{
                  root: "w-full mb-4",
                  form: "flex space-x-2",
                  input: "w-80 p-1 bg-white border border-[#3b2e1e]",
                  submitIcon: "h-4 w-4 relative -left-8",
                  resetIcon: "h-4 w-4 relative -left-6 cursor-pointer",
                }}
              /> */}
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10",
                }}
              />
            </main>
          </div>
        </InstantSearchNext>
      </div>
    </>
  );
}
