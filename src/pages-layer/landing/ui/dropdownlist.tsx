"use client"

import { useState } from 'react';
// import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { ChevronDown } from 'lucide-react'; // Стрелка вниз из Lucide



const DropdownList = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index); // Если тот же элемент открыт, закрываем его
  };

  return (
    <section className=" py-8 text-gray-900">
      <div className="container mx-auto px-6 max-w-screen-xl mb-6 sm:mt-14 sm:mb-14 lg:px-16">

        {/* Массовый подбор */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(0)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Mass recruitment</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 0 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 0 && (
            <div className="p-6">
              <p className="text-gray-600">
                For large companies or projects requiring a large number of employees, traditional methods can be too slow and costly. The service provides fast and efficient mass recruitment of frontline staff.
              </p>
            </div>
          )}
        </div>

        {/* Поиск квалифицированных кадров */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(1)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Qualified staff search</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 1 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 1 && (
            <div className="p-6">
              <p className="text-gray-600">
                We automate and accelerate the search for office and production qualified specialists. We conduct interviews and testing.
              </p>
            </div>
          )}
        </div>

        {/* Найм IT и экспертов */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(2)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">IT and expert hiring</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 2 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 2 && (
            <div className="p-6">
              <p className="text-gray-600">
                We automate the entire IT interview pipeline: technical, algorithms, live coding, soft skills. No need to distract employees from their main work.
              </p>
            </div>
          )}
        </div>

        {/* Контент для четвертого раздела */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(3)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Startup recruiting</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 3 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 3 && (
            <div className="p-6">
              <p className="text-gray-600">
                We help startups find the right specialists at early stages, offering rapid selection and team onboarding. Our tools allow effective team scaling.
              </p>
            </div>
          )}
        </div>

        {/* Контент для пятого раздела */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(4)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">HR consulting</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 4 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 4 && (
            <div className="p-6">
              <p className="text-gray-600">
                We provide consulting to improve hiring processes and people management. We help build sound HR strategies and increase the effectiveness of working with people.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default DropdownList;
