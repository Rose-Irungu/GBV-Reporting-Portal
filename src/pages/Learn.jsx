import React from "react";

export default function Learn() {
  const sections = [
    {
      title: "What is Gender-Based Violence (GBV)?",
      content:
        "Gender-Based Violence refers to harmful acts directed at individuals based on their gender. It includes physical, emotional, sexual, and economic abuse. GBV can happen to anyone but disproportionately affects women, girls, and vulnerable groups.",
    },
    {
      title: "Our Commitment",
      content:
        "Our platform was created to give survivors and witnesses a voice—safely and securely. Whether you're reporting an incident, seeking help, or educating yourself, we’re here to support your journey with compassion and confidentiality.",
    },
    {
      title: "Support & Resources",
      content: [
        "24/7 helplines for counseling and emergency response",
        "Legal support and victim advocacy",
        "Medical assistance and trauma care",
        "Safe shelters and rehabilitation centers",
        "Educational material about GBV prevention",
      ],
    },
    {
      title: "How You Can Help",
      content: [
        "Share our platform with those who might need it",
        "Volunteer with local support organizations",
        "Donate to verified GBV response groups",
        "Speak up against harassment and abuse in your community",
      ],
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-12">
          Learn More About GBV
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const isPurpleBg = index === 0 || index === 3;
            return (
              <div
                key={index}
                className={`rounded-2xl p-6 shadow-md transition hover:shadow-xl ${
                  isPurpleBg
                    ? "bg-purple-300 text-black"
                    : "bg-white text-gray-800"
                }`}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc pl-6 space-y-1">
                    {section.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="leading-relaxed">{section.content}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/resources"
              className="inline-block bg-purple-400 text-black px-6 py-3 rounded-full hover:bg-purple-600 transition"
          >
            Explore Resources
          </a>
        </div>
      </div>
    </div>
  );
}
