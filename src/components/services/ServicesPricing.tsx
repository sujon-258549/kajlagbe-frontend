"use client"; // Force reload

import { useState, useEffect } from "react";
import { Check, Edit, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading2 from "@/components/common/Headings/Heading2";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesPricingSectionModal, {
  PricingSectionFormData,
} from "../modal/services/ServicesPricingSectionModal";
import ServicesPricingCardModal, {
  PricingCardFormData,
} from "../modal/services/ServicesPricingCardModal";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { toast } from "react-toastify";

export default function ServicesPricing() {
  const [sectionData, setSectionData] = useState<PricingSectionFormData>({
    tagline: "PRICING PLANS",
    title: "Choose the right plan for your farm",
  });
  const [plans, setPlans] = useState<PricingCardFormData[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("services_pricing");
      if (res.success) {
        if (res.data.pricing_section) {
          setSectionData(res.data.pricing_section.value);
        }
        if (res.data.pricing_plans) {
          setPlans(res.data.pricing_plans.value);
        }
      }
    };
    fetchData();
  }, []);

  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingCardIndex, setEditingCardIndex] = useState<number | null>(null);

  const handleAddPlan = () => {
    setEditingCardIndex(-1); // -1 means new plan
  };

  const handleSectionUpdate = async (data: PricingSectionFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "pricing_section",
        value: data,
        group: "services_pricing",
        description: "Services Pricing Section Settings",
      });
      if (res.success) {
        setSectionData(data);
        toast.success("Section updated!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error updating section");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCardUpdate = async (data: PricingCardFormData) => {
    if (editingCardIndex === null) return false;
    setIsUpdating(true);
    try {
      const updatedPlans = [...plans];
      if (editingCardIndex === -1) {
        updatedPlans.push(data);
      } else {
        updatedPlans[editingCardIndex] = data;
      }

      const res = await upsertSetting({
        key: "pricing_plans",
        value: updatedPlans,
        group: "services_pricing",
        description: "Services Pricing Plans",
      });

      if (res.success) {
        setPlans(updatedPlans);
        toast.success(editingCardIndex === -1 ? "Plan added!" : "Plan updated!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error saving plan");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePlan = async (idx: number) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    setIsUpdating(true);
    try {
      const updatedPlans = plans.filter((_, i) => i !== idx);
      const res = await upsertSetting({
        key: "pricing_plans",
        value: updatedPlans,
        group: "services_pricing",
      });
      if (res.success) {
        setPlans(updatedPlans);
        toast.success("Plan deleted!");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error deleting plan");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="py-6 md:py-8 lg:py-12 bg-secondary relative group/section">
      <div className="main-container relative">
        <AdminOnly>
          <button
            onClick={() => setIsSectionModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-lg backdrop-blur-md"
            title="Edit Title & Tagline"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="text-center max-w-2xl mx-auto mb-16 relative group/header">
          <AdminOnly>
            <Button
              onClick={handleAddPlan}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#86b86b] hover:bg-primary text-white rounded-full"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Plan
            </Button>
          </AdminOnly>
          <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
            {sectionData.tagline}
          </span>
          <Heading2 className="text-white">{sectionData.title}</Heading2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-8 transition-all duration-300 bg-white group/card ${
                plan.recommended
                  ? "border border-[#86b86b] lg:scale-105 z-10"
                  : "border border-gray-100"
              }`}
            >
              <AdminOnly>
                <div className="absolute top-4 right-4 z-50 flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all">
                  <button
                    onClick={() => setEditingCardIndex(idx)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white"
                    title="Edit Card"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(idx)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                    title="Delete Card"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </AdminOnly>

              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <div className="text-center mb-8">
                <h4
                  className={`text-lg font-bold mb-4 ${
                    plan.recommended ? "text-secondary" : "text-slate-500"
                  }`}
                >
                  {plan.name}
                </h4>
                <div className="flex items-start justify-center">
                  <span className="text-2xl font-bold mt-2">$</span>
                  <span className="text-6xl font-bold">{plan.price}</span>
                  <span className="text-sm font-medium mt-auto mb-2 opacity-70">
                    /mo
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        plan.recommended
                          ? "bg-secondary text-white"
                          : "bg-[#f5fbf0] text-secondary"
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-sm text-slate-600`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-12 rounded-xl font-bold transition-transform hover:scale-[1.02] ${
                  plan.recommended
                    ? "bg-secondary text-white hover:bg-[#86b86b]"
                    : "bg-[#f5fbf0] text-secondary hover:bg-secondary hover:text-white"
                }`}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>

      <ServicesPricingSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        initialData={sectionData}
        onUpdate={handleSectionUpdate}
        isLoading={isUpdating}
      />

      {editingCardIndex !== null && (
        <ServicesPricingCardModal
          isOpen={true}
          onClose={() => setEditingCardIndex(null)}
          initialData={
            editingCardIndex === -1
              ? { name: "", price: "", features: [], recommended: false }
              : plans[editingCardIndex]
          }
          onUpdate={handleCardUpdate}
          isLoading={isUpdating}
        />
      )}
    </section>
  );
}
