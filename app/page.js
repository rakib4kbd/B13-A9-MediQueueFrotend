import Footer from "@/components/Footer/Footer";
import AvailableTutors from "@/components/HomeSections/AvailableTutors";
import BannerSection from "@/components/HomeSections/BannerSection";
import HowItWorkSection from "@/components/HomeSections/HowItWorkSection/HowItWorkSection";
import KeyMetrics from "@/components/HomeSections/KeyMetrics/KeyMetrics";

export default function Home() {
  return (
    <div className="bg-base-200">
      <BannerSection />
      <HowItWorkSection />
      <AvailableTutors />
      <KeyMetrics />
    </div>
  );
}
