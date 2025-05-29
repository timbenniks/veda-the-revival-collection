import { useEffect, useState } from "react";
import { X, LockIcon, Info } from "lucide-react";
// import { JsonViewer } from "@textea/json-viewer";

import { useJstag } from "./lytics";
type Entity = any;

export const useEntity = (): Entity | null => {
  const jstag = useJstag();
  const [entity, setEntity] = useState<Entity | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const off = jstag.on("entity.loaded", (_, entity: Entity) => {
        setEntity(entity);
      });
      return () => {
        off();
      };
    }
    return undefined;
  }, [jstag]);

  return entity;
};

type LyticsExtensionProps = {
  isStatsOpen: boolean;
  setIsStatsOpen: (isOpen: boolean) => void;
};

export default function LyticsExtension({
  isStatsOpen,
  setIsStatsOpen,
}: LyticsExtensionProps) {
  const lyticsProfileData = useEntity();
  const [selectedTab, setSelectedTab] = useState("Summary");

  function moveDecimalPoint(num: number): string {
    if (num >= 1) {
      return "100";
    }
    const str = num.toString();
    const decimalIndex = str.indexOf(".");

    return str.slice(decimalIndex + 1, decimalIndex + 3);
  }

  return (
    <div className="relative hidden md:block">
      {lyticsProfileData ? (
        <button
          className="cursor-pointer"
          name="Lytics stats icon"
          title="Lytics stats icon"
          onClick={() => setIsStatsOpen(true)}
        >
          <Info className="w-5 h-5" />
        </button>
      ) : (
        <button
          className="opacity-30 cursor-pointer"
          name="Lytics stats icon"
          title="Lytics stats icon"
        >
          <Info className="w-5 h-5" />
        </button>
      )}

      <div
        className={`absolute right-0 mt-2 w-[480px] bg-white text-black shadow-lg overflow-hidden z-50 ${
          isStatsOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[#3b2e1e] font-medium">
              Personalization Information
            </p>
            <button
              onClick={() => setIsStatsOpen(false)}
              className="text-gray-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-[50px] flex grid-cols-3 border-b-[1px] border-neutral font-roboto text-[14px] font-semibold tracking-wide">
            <div
              className={`flex items-center py-4 px-8 ${
                selectedTab === "Summary"
                  ? "border-b-[#3b2e1e] text-[#3b2e1e]"
                  : "text-[#ababab] border-b-transparent"
              } border-b-[3px] cursor-pointer`}
              onClick={() => setSelectedTab("Summary")}
            >
              Summary
            </div>
            <div
              className={`flex items-center py-4 px-8 ${
                selectedTab === "All Attributes"
                  ? "border-b-[#3b2e1e] text-[#3b2e1e]"
                  : "text-[#ababab] border-b-transparent"
              } border-b-[3px] cursor-pointer`}
              onClick={() => setSelectedTab("All Attributes")}
            >
              Attributes (
              {lyticsProfileData &&
                Object.keys(lyticsProfileData?.data?.user).length}
              )
            </div>
            <div
              className={`flex items-center py-4 px-8 ${
                selectedTab === "Customer"
                  ? "border-b-[#3b2e1e] text-[#3b2e1e]"
                  : "text-[#ababab] border-b-transparent"
              } border-b-[3px] cursor-pointer`}
              onClick={() =>
                lyticsProfileData?.data?.user?.email
                  ? setSelectedTab("Customer")
                  : ""
              }
            >
              Customer
            </div>
          </div>

          <div className="px-2">
            <div className={`${selectedTab === "Summary" ? "" : "hidden"}`}>
              <div className="h-[90%] border-lg pt-1 pb-2 px-4">
                <div className="border-b-[1px] border-neutral-200 flex items-center justify-between mx-2 py-2">
                  <div className="text-[14px] font-semibold normal-case mr-12 py-2">
                    Lytics ID
                  </div>
                  <div className="text-[12px] font-medium justify-self-end normal-case">
                    {lyticsProfileData?.data?.user?._id}
                  </div>
                </div>

                <div className="border-b-[1px] border-neutral-200 flex flex-col justify-between m-2 py-2">
                  <div className="text-[14px] font-semibold normal-case ">
                    Audiences
                  </div>
                  <div className="text-[14px] normal-case flex flex-row flex-wrap justify-center">
                    {lyticsProfileData?.data?.user?.segments?.map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="border-[1px] text-[12px]  border-neutral-400 rounded-lg bg-white p-1 m-1 max-w-[80%] truncate"
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="border-b-[1px] border-neutral-200 flex flex-col justify-between m-2 py-3">
                  <div className="text-[14px] font-semibold normal-case mb-2">
                    Lookalike Models
                  </div>

                  <div className="flex justify-center flex-col">
                    {lyticsProfileData?.data?.user?.segment_prediction &&
                      Object.keys(
                        lyticsProfileData?.data?.user?.segment_prediction
                      ).map((item: string, index: number) => (
                        <div
                          key={index}
                          className="flex flex-row normal-case text-[12px] justify-end my-1"
                        >
                          <div className="mr-4 w-[35%]">{item}</div>
                          <div className="mr-2 text-end w-[6%]">
                            {moveDecimalPoint(
                              lyticsProfileData?.data?.user?.segment_prediction[
                                item
                              ]
                            )}
                          </div>
                          <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                            <div
                              className={`absolute top-0 left-0 bg-gradient-to-r from-[#f6b25e] to-amber-600 rounded-sm h-full  border-r-black`}
                              style={{
                                width:
                                  moveDecimalPoint(
                                    lyticsProfileData?.data?.user
                                      ?.segment_prediction[item]
                                  ) + "%",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-b-[1px] border-neutral-200 flex flex-col justify-between m-2 py-3">
                  <div className="text-[14px] font-semibold normal-case mb-2">
                    Behavioral Scores
                  </div>

                  <div className="flex justify-center flex-col">
                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Consistency</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_consistency}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_consistency +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Frequency</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_frequency}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_frequency +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Intensity</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_intensity}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_intensity +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Maturity</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_maturity}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_maturity +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Momentum</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_momentum}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_momentum +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Propensity</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_propensity}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_propensity +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Quantity</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_quantity}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`"absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width: `${lyticsProfileData?.data?.user?.score_quantity}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Recency</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_recency}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_recency +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-row normal-case text-[12px] justify-end my-1">
                      <div className="mr-4 w-[35%]">Volatility</div>
                      <div className="mr-1 w-[6%] text-end">
                        {lyticsProfileData?.data?.user?.score_volatility}
                      </div>
                      <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                        <div
                          className={`absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full`}
                          style={{
                            width:
                              lyticsProfileData?.data?.user?.score_volatility +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-neutral-200 flex flex-col justify-between m-2 py-2">
                  <div className="text-[14px] font-semibold normal-case my-2">
                    Interests
                  </div>

                  <div className="flex justify-center flex-col">
                    {lyticsProfileData?.data?.user.lytics_content ? (
                      Object.keys(
                        lyticsProfileData?.data?.user.lytics_content
                      ).map((item: string, index: number) => (
                        <div
                          key={index}
                          className="flex flex-row normal-case text-[12px] justify-end my-1"
                        >
                          <div className="mr-4 w-[35%] truncate">{item}</div>
                          <div className="mr-2 text-end w-[6%]">
                            {moveDecimalPoint(
                              lyticsProfileData?.data?.user?.lytics_content[
                                item
                              ]
                            )}
                          </div>
                          <div className="w-[60%] bg-[#d9d9e1] border-[1px] border-neutral-100 relative">
                            <div
                              className="absolute top-0 left-0 bg-gradient-to-r from-[#3b2e1e] to-[#bd8f56] rounded-sm h-full"
                              style={{
                                width:
                                  moveDecimalPoint(
                                    lyticsProfileData?.data?.user
                                      ?.lytics_content[item]
                                  ) + "%",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#f6f5fc] flex flex-col justify-center rounded-lg p-4 items-center">
                        <LockIcon className="h-8 w-8 text-neutral-600" />
                        <div className="text-black text-[14px] font-light normal-case flex justify-center self-center">
                          Browse more content to unlock interests
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${selectedTab === "Customer" ? "" : "hidden"} p-4`}
            >
              <div className="rounded-lg bg-[#EFBF04] text-center p-8  font-semibold">
                GOLD
              </div>

              <div className="border-b-[1px] border-neutral-200 p-2">
                <p className="text-[14px] font-semibold mt-8">Salesforce</p>
              </div>

              <div className="flex flex-row normal-case text-[14px] justify-end my-1 mt-5">
                <div className="mr-4 w-[40%] pl-8">Full Name</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.salesforce_lead_name}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4 w-[40%] pl-8">Phone Number</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.salesforce_lead_phone}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4 w-[40%] pl-8">Postal Code</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.salesforce_lead_postal_code}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4 w-[40%] pl-8">Marketing Opt Out</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user
                    ?.salesforce_lead_has_opted_out_of_email
                    ? "True"
                    : "False"}
                </div>
              </div>

              <div className="flex flex-row normal-case text-[14px] justify-end my-1 mt-5">
                <div className="mr-4 w-[40%] pl-8">Company</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.salesforce_lead_company}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4 w-[40%] pl-8">Industry</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.salesforce_lead_industry}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4 w-[40%] pl-8">Number Of Employees</div>
                <div className="w-[60%] relative">
                  {
                    lyticsProfileData?.data?.user
                      ?.salesforce_lead_number_of_employees
                  }
                </div>
              </div>

              <div className="border-b-[1px] border-neutral-200 p-2">
                <p className="text-[14px] font-semibold mt-8">Bookings</p>
              </div>

              <div className="flex flex-row normal-case text-[14px] justify-end my-1 mt-5">
                <div className="mr-4  w-[40%] pl-8">Past 12 months</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.lead_booking_count_12m}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4  w-[40%] pl-8">Nights</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.lead_booking_count_nights}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4  w-[40%] pl-8">Lifetime</div>
                <div className="w-[60%] relative">
                  {lyticsProfileData?.data?.user?.lead_booking_count_lifetime}
                </div>
              </div>
              <div className="flex flex-row normal-case text-[14px] justify-end my-1">
                <div className="mr-4  w-[40%] pl-8">Lifetime Nights</div>
                <div className="w-[60%] relative">
                  {
                    lyticsProfileData?.data?.user
                      ?.lead_booking_count_lifetime_nights
                  }
                </div>
              </div>
            </div>

            <div
              className={`${
                selectedTab === "All Attributes" ? "" : "hidden"
              } p-4`}
            >
              {/* <JsonViewer
                value={lyticsProfileData?.data?.user}
                rootName={"user"}
                enableClipboard={false}
                displayDataTypes={false}
                theme={"light"}
              /> */}
              <pre>
                {JSON.stringify(lyticsProfileData?.data?.user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
