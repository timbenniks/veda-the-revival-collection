import { useEffect, useState } from "react";
import { X, LockIcon, Info } from "lucide-react";
import JsonView from "@uiw/react-json-view";

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

type ProgressBarProps = {
  label: string;
  value: number | string;
  isPercentage?: boolean;
  gradient?: string;
};

const ProgressBar = ({
  label,
  value,
  isPercentage = true,
  gradient = "from-[#3b2e1e] to-[#bd8f56]",
}: ProgressBarProps) => {
  const formattedValue =
    typeof value === "number"
      ? isPercentage
        ? value
        : moveDecimalPoint(value)
      : value;

  return (
    <div className="my-1 flex flex-row justify-end text-xs ">
      <div className="mr-4 w-[35%] truncate">{label}</div>
      <div className="mr-2 w-[6%] text-end">{formattedValue}</div>
      <div className="relative w-[60%] border border-neutral-100 bg-[#d9d9e1]">
        <div
          className={`absolute top-0 left-0 h-full rounded-sm bg-gradient-to-r ${gradient}`}
          style={{
            width: `${formattedValue}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
  paddingLeft?: boolean;
};

const InfoRow = ({ label, value, paddingLeft = true }: InfoRowProps) => (
  <div className="my-1 flex flex-row justify-end text-sm ">
    <div className={`mr-4 w-[40%] ${paddingLeft ? "pl-8" : ""}`}>{label}</div>
    <div className="relative w-[60%]">{value}</div>
  </div>
);

type SectionHeaderProps = {
  title: string;
  className?: string;
};

const SectionHeader = ({ title, className = "" }: SectionHeaderProps) => (
  <div className={`border-b border-neutral-200 p-2 ${className}`}>
    <p className="mt-8 text-sm font-semibold">{title}</p>
  </div>
);

function moveDecimalPoint(num: number): string {
  if (num >= 1) {
    return "100";
  }
  const str = num.toString();
  const decimalIndex = str.indexOf(".");

  return str.slice(decimalIndex + 1, decimalIndex + 3);
}

export default function LyticsExtension({
  isStatsOpen,
  setIsStatsOpen,
}: LyticsExtensionProps) {
  const lyticsProfileData = useEntity();
  const [selectedTab, setSelectedTab] = useState("Summary");

  const renderBehavioralScores = () => {
    const scores = [
      {
        label: "Consistency",
        value: lyticsProfileData?.data?.user?.score_consistency,
      },
      {
        label: "Frequency",
        value: lyticsProfileData?.data?.user?.score_frequency,
      },
      {
        label: "Intensity",
        value: lyticsProfileData?.data?.user?.score_intensity,
      },
      {
        label: "Maturity",
        value: lyticsProfileData?.data?.user?.score_maturity,
      },
      {
        label: "Momentum",
        value: lyticsProfileData?.data?.user?.score_momentum,
      },
      {
        label: "Propensity",
        value: lyticsProfileData?.data?.user?.score_propensity,
      },
      {
        label: "Quantity",
        value: lyticsProfileData?.data?.user?.score_quantity,
      },
      { label: "Recency", value: lyticsProfileData?.data?.user?.score_recency },
      {
        label: "Volatility",
        value: lyticsProfileData?.data?.user?.score_volatility,
      },
    ];

    return scores.map((score, index) => (
      <ProgressBar key={index} label={score.label} value={score.value} />
    ));
  };

  const renderInterests = () => {
    if (!lyticsProfileData?.data?.user.lytics_content) {
      return (
        <div className="flex flex-col items-center justify-center rounded-lg bg-[#f6f5fc] p-4">
          <LockIcon className="h-8 w-8 text-neutral-600" />
          <div className="text-sm font-light  text-black self-center">
            Browse more content to unlock interests
          </div>
        </div>
      );
    }

    return Object.keys(lyticsProfileData?.data?.user.lytics_content).map(
      (item, index) => (
        <ProgressBar
          key={index}
          label={item}
          value={lyticsProfileData?.data?.user?.lytics_content[item]}
          isPercentage={false}
          gradient="from-[#3b2e1e] to-[#bd8f56]"
        />
      )
    );
  };

  const renderLookalikeModels = () => {
    if (!lyticsProfileData?.data?.user?.segment_prediction) return null;

    return Object.keys(lyticsProfileData?.data?.user?.segment_prediction).map(
      (item, index) => (
        <ProgressBar
          key={index}
          label={item}
          value={lyticsProfileData?.data?.user?.segment_prediction[item]}
          isPercentage={false}
          gradient="from-[#f6b25e] to-amber-600"
        />
      )
    );
  };

  return (
    <div className="relative hidden md:block">
      {lyticsProfileData ? (
        <button
          className="cursor-pointer"
          name="Lytics stats icon"
          title="Lytics stats icon"
          onClick={() => setIsStatsOpen(true)}
        >
          <Info className="h-5 w-5" />
        </button>
      ) : (
        <button
          className="cursor-pointer opacity-30"
          name="Lytics stats icon"
          title="Lytics stats icon"
        >
          <Info className="h-5 w-5" />
        </button>
      )}

      <div
        className={`absolute right-0 mt-2 z-50 w-[480px] bg-white shadow-lg text-black overflow-hidden ${
          isStatsOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col max-h-[calc(100vh-100px)]">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium text-[#3b2e1e]">
                Personalization Information
              </p>
              <button
                onClick={() => setIsStatsOpen(false)}
                className="cursor-pointer text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex text-sm font-medium border-b border-neutral-200">
              <div
                className={`flex cursor-pointer items-center px-4 py-2 border-b-[3px] ${
                  selectedTab === "Summary"
                    ? "border-b-[#3b2e1e] text-[#3b2e1e]"
                    : "border-b-transparent text-[#ababab]"
                }`}
                onClick={() => setSelectedTab("Summary")}
              >
                Summary
              </div>
              <div
                className={`flex cursor-pointer items-center px-4 py-2 border-b-[3px] ${
                  selectedTab === "All Attributes"
                    ? "border-b-[#3b2e1e] text-[#3b2e1e]"
                    : "border-b-transparent text-[#ababab]"
                }`}
                onClick={() => setSelectedTab("All Attributes")}
              >
                Attributes (
                {lyticsProfileData &&
                  Object.keys(lyticsProfileData?.data?.user).length}
                )
              </div>
              <div
                className={`flex cursor-pointer items-center px-4 py-2 border-b-[3px] ${
                  selectedTab === "Customer"
                    ? "border-b-[#3b2e1e] text-[#3b2e1e]"
                    : "border-b-transparent text-[#ababab]"
                }`}
                onClick={() =>
                  lyticsProfileData?.data?.user?.email
                    ? setSelectedTab("Customer")
                    : ""
                }
              >
                Customer
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="px-2">
              <div className={`${selectedTab === "Summary" ? "" : "hidden"}`}>
                <div className="px-4 py-1 pb-2">
                  <div className="flex items-center justify-between mx-2 py-2 border-b border-neutral-200">
                    <div className="mr-12 py-2 text-sm font-semibold ">
                      Lytics ID
                    </div>
                    <div className="text-xs font-medium  justify-self-end">
                      {lyticsProfileData?.data?.user?._id}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between m-2 py-2 border-b border-neutral-200">
                    <div className="text-sm font-semibold mb-4">Audiences</div>
                    <ul className="flex flex-row flex-wrap justify-start text-sm gap-2 mb-4">
                      {lyticsProfileData?.data?.user?.segments?.map(
                        (item: string, index: number) => (
                          <li
                            key={`${item}-${index}`}
                            className="max-w-[80%] truncate rounded-lg border border-neutral-400 bg-white px-2 py-1 text-xs"
                          >
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {lyticsProfileData?.data?.user?.segment_prediction && (
                    <div className="flex flex-col justify-between m-2 py-3 border-b border-neutral-200">
                      <div className="mb-2 text-sm font-semibold ">
                        Lookalike Models
                      </div>

                      <div className="flex flex-col justify-center">
                        {renderLookalikeModels()}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col justify-between m-2 py-3 border-b border-neutral-200">
                    <div className="mb-2 text-sm font-semibold ">
                      Behavioral Scores
                    </div>

                    <div className="flex flex-col justify-center">
                      {renderBehavioralScores()}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between m-2 py-2">
                    <div className="my-2 text-sm font-semibold ">Interests</div>

                    <div className="flex flex-col justify-center">
                      {renderInterests()}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${selectedTab === "Customer" ? "" : "hidden"} p-4`}
              >
                <div className="rounded-lg bg-[#EFBF04] p-8 text-center font-semibold">
                  GOLD
                </div>

                <SectionHeader title="Salesforce" />

                <InfoRow
                  label="Full Name"
                  value={lyticsProfileData?.data?.user?.salesforce_lead_name}
                />
                <InfoRow
                  label="Phone Number"
                  value={lyticsProfileData?.data?.user?.salesforce_lead_phone}
                />
                <InfoRow
                  label="Postal Code"
                  value={
                    lyticsProfileData?.data?.user?.salesforce_lead_postal_code
                  }
                />
                <InfoRow
                  label="Marketing Opt Out"
                  value={
                    lyticsProfileData?.data?.user
                      ?.salesforce_lead_has_opted_out_of_email
                      ? "True"
                      : "False"
                  }
                />

                <InfoRow
                  label="Company"
                  value={lyticsProfileData?.data?.user?.salesforce_lead_company}
                  paddingLeft={true}
                />
                <InfoRow
                  label="Industry"
                  value={
                    lyticsProfileData?.data?.user?.salesforce_lead_industry
                  }
                />
                <InfoRow
                  label="Number Of Employees"
                  value={
                    lyticsProfileData?.data?.user
                      ?.salesforce_lead_number_of_employees
                  }
                />

                <SectionHeader title="Bookings" />

                <InfoRow
                  label="Past 12 months"
                  value={lyticsProfileData?.data?.user?.lead_booking_count_12m}
                />
                <InfoRow
                  label="Nights"
                  value={
                    lyticsProfileData?.data?.user?.lead_booking_count_nights
                  }
                />
                <InfoRow
                  label="Lifetime"
                  value={
                    lyticsProfileData?.data?.user?.lead_booking_count_lifetime
                  }
                />
                <InfoRow
                  label="Lifetime Nights"
                  value={
                    lyticsProfileData?.data?.user
                      ?.lead_booking_count_lifetime_nights
                  }
                />
              </div>

              <div
                className={`${
                  selectedTab === "All Attributes" ? "" : "hidden"
                } p-4`}
              >
                {lyticsProfileData && (
                  <JsonView
                    collapsed={1}
                    enableClipboard={false}
                    displayObjectSize={false}
                    value={lyticsProfileData?.data?.user}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
