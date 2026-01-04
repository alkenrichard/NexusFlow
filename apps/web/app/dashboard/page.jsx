import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";

import { title, subtitle } from "@/components/primitives";
import PieChart from "./components/pieChart";

export default function Dashboard() {
  return (
    <section>
      <PieChart />

      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
