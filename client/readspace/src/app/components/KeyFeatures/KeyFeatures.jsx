import { keyFeatures } from "../../../../utils/dummyData.js";
import KeyFeatureSingle from "../KeyFeatureSingle/KeyFeatureSingle.jsx";
export default function KeyFeatures() {
  return (
    <section className="flex flex-col min-h-fit  py-4 gap-8">
      <div className="grid grid-cols-2 items-baseline gap-8 md:grid-cols-4   ">
        {keyFeatures.map((feature, i) => (
          <KeyFeatureSingle key={i} data={feature} />
        ))}
      </div>
    </section>
  );
}
