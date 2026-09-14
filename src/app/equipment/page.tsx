import { getSiteContent } from "@/app/actions/cms";
import { EquipmentClient } from "./EquipmentClient";

export default async function EquipmentDiscoveryPage() {
  const cms = await getSiteContent();
  const heroData = cms?.pages?.equipment?.hero || {
    title: "Find <span className=\"text-amber-500\">Equipment</span>",
    subtitle: "Browse available heavy machinery and logistics services across Liberia. Top-tier brands maintained to the highest standards.",
    image: "/images/cat_336_excavator.png"
  };

  return <EquipmentClient heroData={heroData} />;
}
