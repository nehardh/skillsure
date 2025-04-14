import React from "react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "₹0/month",
    features: [
      "Access to basic chapters",
      "Community Q&A",
    ],
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    name: "Standard",
    price: "₹99/month",
    features: [
      "Access to all notes",
      "Quizzes & Flashcards",
      "Study progress tracking",
    ],
    buttonText: "Upgrade to Standard",
    disabled: false,
  },
  {
    name: "Premium",
    price: "₹199/month",
    features: [
      "All Standard features",
      "Personalized recommendations",
      "Early access to new materials",
    ],
    buttonText: "Upgrade to Premium",
    disabled: false,
  },
];

function UpgradePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">🚀 Choose Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center border hover:shadow-xl transition-all"
            >
              <div className="text-left">
  <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
  <p className="text-xl font-bold text-blue-600 mb-4">{plan.price}</p>
</div>


              <ul className="text-sm text-gray-700 mb-6 space-y-2 text-left">
                {plan.features.map((feature, i) => (
                    <li key={i}>✅ {feature}</li>
                ))}
                </ul>


              <Button
                disabled={plan.disabled}
                className={`w-full text-white font-medium text-sm ${
                  plan.disabled
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-sm text-center text-gray-500 mt-10">
          Have a coupon? Apply it during checkout. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

export default UpgradePage;
