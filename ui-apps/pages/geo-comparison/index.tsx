// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import dynamic from "next/dynamic";
import { LeftRightSidebarLayout } from "../../components/app-shell/left-right-sidebar";

// import { GeoComparison } from ;

const GeoComparison = dynamic(() => import("../../components/geo-comparison/geo-comparison"), {
  ssr: false,
});

export default function HomePage() {
  return <GeoComparison />;
}
