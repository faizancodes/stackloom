import { AlertList } from "@/components/alerts/alert-list";
import { AlertRuleBuilder } from "@/components/alerts/alert-rule-builder";
import { Card } from "@/components/ui/card";
import { useStackloomStore } from "@/lib/store";

export default function AlertsPage() {
  const alertRules = useStackloomStore((state) => state.alertRules);
  const alertItems = useStackloomStore((state) => state.alertItems);
  const enabledRules = alertRules.filter((rule) => rule.enabled);
  const monitoredPackages = new Set(alertRules.map((rule) => rule.slug)).size;

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#7C3AED]">Alerts</p>
        <h2 className="text-3xl font-light text-white lg:text-4xl">Track maintenance lag, bus factor risk, adoption acceleration, and support debt.</h2>
        <p className="max-w-3xl text-sm text-[#a1a1a1]">Build rules around GitHub commit inactivity, npm download drops, unresolved StackExchange ratios, and npms.io maintenance scores.</p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AlertRuleBuilder />
        <Card title="Rule status" description="Current alert coverage across your monitored packages.">
          <div className="space-y-4 text-sm text-[#a1a1a1]">
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <span>Enabled rules</span>
              <span className="text-white">{enabledRules.length}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#222222] pb-3">
              <span>Triggered alerts</span>
              <span className="text-white">{alertItems.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Packages under watch</span>
              <span className="text-white">{monitoredPackages}</span>
            </div>
          </div>
        </Card>
      </div>

      <AlertList alerts={alertItems} />
    </div>
  );
}
