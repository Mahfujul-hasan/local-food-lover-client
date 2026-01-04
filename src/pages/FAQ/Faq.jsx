// FAQ.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How can I create an account?",
    answer:
      "To create an account, click on the 'Sign Up' button at the top-right corner and fill in your details. You will receive a confirmation email to verify your account.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "If you forget your password, click on 'Forgot Password' on the login page. Enter your registered email, and we will send you a link to reset your password.",
  },
  {
    question: "Can I update my profile information?",
    answer:
      "Yes! You can update your profile information from the 'My Profile' section after logging in.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team via the Contact Us page or send an email to support@example.com. We aim to respond within 24 hours.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use industry-standard security measures to protect your personal information.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-800 hover:text-primary focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const Faq = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">
        Frequently Asked Questions
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 md:p-10">
        {faqData.map((item, idx) => (
          <FAQItem key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
