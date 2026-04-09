import { Button } from "@/shared/ui/shadcn/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Choose a plan that works for you
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Find the perfect candidates using our service.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Basic Plan */}
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:border-red-500 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Basic
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Perfect for small companies.
            </p>
            <div className="mt-6 text-gray-800 dark:text-white">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="text-lg">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                1 vacancy
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Basic candidate search
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Email support
              </li>
            </ul>
            <Button variant="destructive" className="w-full mt-6">
              Get Basic
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-blue-500 transition-transform transform hover:scale-105 hover:shadow-xl hover:border-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Professional
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              For companies actively searching for specialists.
            </p>
            <div className="mt-6 text-gray-800 dark:text-white">
              <span className="text-4xl font-bold">$29.99</span>
              <span className="text-lg">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                10 vacancies
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Advanced candidate search
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Priority support
              </li>
            </ul>
            <Button variant="destructive" className="w-full mt-6">
              Get Professional
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:border-red-500 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Enterprise
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              For large companies and agencies.
            </p>
            <div className="mt-6 text-gray-800 dark:text-white">
              <span className="text-4xl font-bold">$99.99</span>
              <span className="text-lg">/month</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Unlimited vacancies
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Advanced candidate search
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Dedicated account manager
              </li>
            </ul>
            <Button variant="destructive" className="w-full mt-6">
              Get Enterprise
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
