'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'basic' | 'giver' | 'receiver'>('basic');
  const [basicProfile, setBasicProfile] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    job: '',
    primaryReason: '',
  });
  const [giverProfile, setGiverProfile] = useState({
    recipientType: [] as string[],
    occasion: '',
    budget: '',
    ageRange: '',
    interests: [] as string[],
    categories: [] as string[],
  });
  const [receiverProfile, setReceiverProfile] = useState({
    interests: [] as string[],
    categories: [] as string[],
    style: '',
    avoid: [] as string[],
  });

  if (currentStep === 'basic') {
    return (
      <BasicProfileForm
        data={basicProfile}
        onChange={setBasicProfile}
        onNext={() => setCurrentStep('giver')}
      />
    );
  }

  if (currentStep === 'giver') {
    return (
      <GiverProfileForm
        data={giverProfile}
        onChange={setGiverProfile}
        onBack={() => setCurrentStep('basic')}
        onNext={() => setCurrentStep('receiver')}
      />
    );
  }

  return (
    <ReceiverProfileForm
      data={receiverProfile}
      onChange={setReceiverProfile}
      onBack={() => setCurrentStep('giver')}
      onComplete={() => {
        // Save all profiles (mock)
        console.log({ basicProfile, giverProfile, receiverProfile });
        router.push('/chat');
      }}
    />
  );
}

function BasicProfileForm({
  data,
  onChange,
  onNext,
}: {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      question: 'What is your name?',
      field: 'name',
      placeholder: 'Enter your name',
      type: 'text',
    },
    {
      question: 'What is your age?',
      field: 'age',
      placeholder: 'Enter your age',
      type: 'number',
    },
    {
      question: 'Where do you live?',
      field: 'location',
      placeholder: 'City/District',
      type: 'text',
    },
    {
      question: 'What is your email?',
      field: 'email',
      placeholder: 'email@example.com',
      type: 'email',
    },
    {
      question: 'What is your job/role?',
      field: 'job',
      placeholder: 'e.g., Student, Office Worker, Freelancer',
      type: 'text',
    },
    {
      question: 'What is your primary reason for using this app?',
      field: 'primaryReason',
      placeholder: 'e.g., Gifts for work colleagues',
      type: 'text',
    },
  ];

  const currentScreenData = screens[currentScreen];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCE8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Basic Profile - Question {currentScreen + 1} of {screens.length}
          </div>
          <h2 className="text-2xl font-bold mb-8">{currentScreenData.question}</h2>
        </div>

        <div className="mb-8">
          <input
            type={currentScreenData.type}
            value={data[currentScreenData.field] || ''}
            onChange={(e) => onChange({ ...data, [currentScreenData.field]: e.target.value })}
            placeholder={currentScreenData.placeholder}
            className="w-full p-4 border rounded-lg text-lg"
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBack}
            disabled={currentScreen === 0}
            className="flex-1 p-3 border rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!data[currentScreenData.field]}
            className="flex-1 p-3 bg-[#EC4899] text-white rounded-lg font-medium hover:bg-pink-600 disabled:opacity-50"
          >
            {currentScreen === screens.length - 1 ? 'Next Step' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

function GiverProfileForm({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: any;
  onChange: (data: any) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      question: "Who do you primarily give gifts to?",
      type: 'multi-select',
      options: ['Friends', 'Partner', 'Parents', 'Work Colleagues', 'Siblings'],
      field: 'recipientType'
    },
    {
      question: "What's the main occasion?",
      type: 'select',
      options: ['Birthday', 'Anniversary', 'Housewarming', 'Promotion', 'Thank You', 'Holiday', 'Other'],
      field: 'occasion'
    },
    {
      question: "What's your usual budget?",
      type: 'select',
      options: ['<$10', '$10-$30', '$30-$50', '$50-$80', '$80+'],
      field: 'budget'
    },
    {
      question: "What's the recipient's usual age range?",
      type: 'select',
      options: ['10s', '20s', '30s', '40s', '50s', '60s+'],
      field: 'ageRange'
    },
    {
      question: "What interests do you often consider?",
      type: 'multi-select',
      options: ['Sports', 'Cooking', 'Travel', 'Reading', 'Fashion', 'Interior', 'Wellness', 'Beauty', 'Tech'],
      field: 'interests'
    },
    {
      question: "What categories do you prefer?",
      type: 'multi-select',
      options: ['Digital', 'Fashion', 'Accessories', 'Beauty', 'Food', 'Kitchen', 'Sports', 'Books', 'Vouchers'],
      field: 'categories'
    }
  ];

  const currentScreenData = screens[currentScreen];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    } else {
      onBack();
    }
  };

  const handleSelect = (value: string) => {
    if (currentScreenData.type === 'multi-select') {
      const current = data[currentScreenData.field] || [];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      onChange({ ...data, [currentScreenData.field]: updated });
    } else {
      onChange({ ...data, [currentScreenData.field]: value });
    }
  };

  const isValueSelected = (value: string) => {
    if (currentScreenData.type === 'multi-select') {
      const current = data[currentScreenData.field] || [];
      return current.includes(value);
    } else {
      return data[currentScreenData.field] === value;
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCE8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Giver Profile - Question {currentScreen + 1} of {screens.length}
          </div>
          <h2 className="text-2xl font-bold mb-8">{currentScreenData.question}</h2>
        </div>

        <div className="space-y-3 mb-8">
          {currentScreenData.options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full p-4 rounded-lg text-left transition ${
                isValueSelected(option)
                  ? 'bg-[#EC4899] text-white'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 p-3 border rounded-lg font-medium hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 p-3 bg-[#EC4899] text-white rounded-lg font-medium hover:bg-pink-600"
          >
            {currentScreen === screens.length - 1 ? 'Next Step' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReceiverProfileForm({
  data,
  onChange,
  onBack,
  onComplete,
}: {
  data: any;
  onChange: (data: any) => void;
  onBack: () => void;
  onComplete: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      question: "What are your interests?",
      type: 'multi-select',
      options: ['🏃Sports', '🍳Cooking', '✈️Travel', '📚Reading', '👕Fashion', '🛋️Interior', '💪Wellness', '💄Beauty', '💻IT/Gadgets', '🎧Music', '🎬Movies', '🐾Pets', '☕Coffee/Tea', '🍷Alcohol', '🎮Gaming'],
      field: 'interests'
    },
    {
      question: "What categories do you prefer to receive?",
      type: 'multi-select',
      options: ['Digital', 'Fashion', 'Accessories', 'Beauty', 'Food', 'Kitchen', 'Sports', 'Books', 'Vouchers'],
      field: 'categories'
    },
    {
      question: "What style do you prefer?",
      type: 'select',
      options: ['Practical/Daily Use', 'Emotional/Beautiful', 'Special Experience (tickets)', 'Luxurious/High-end', 'Fun/Unique'],
      field: 'style'
    },
    {
      question: "Anything to avoid?",
      type: 'multi-select',
      options: ['Specific Foods (allergies)', 'Specific Scents', 'Clothing (sizing)', 'Flowers', 'Books'],
      field: 'avoid'
    },
  ];

  const currentScreenData = screens[currentScreen];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    } else {
      onBack();
    }
  };

  const handleSelect = (value: string) => {
    if (currentScreenData.type === 'multi-select') {
      const current = data[currentScreenData.field] || [];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      onChange({ ...data, [currentScreenData.field]: updated });
    } else {
      onChange({ ...data, [currentScreenData.field]: value });
    }
  };

  const isValueSelected = (value: string) => {
    if (currentScreenData.type === 'multi-select') {
      const current = data[currentScreenData.field] || [];
      return current.includes(value);
    } else {
      return data[currentScreenData.field] === value;
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCE8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            Receiver Profile - Question {currentScreen + 1} of {screens.length}
          </div>
          <h2 className="text-2xl font-bold mb-8">{currentScreenData.question}</h2>
        </div>

        <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
          {currentScreenData.options.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full p-4 rounded-lg text-left transition ${
                isValueSelected(option)
                  ? 'bg-[#EC4899] text-white'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 p-3 border rounded-lg font-medium hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 p-3 bg-[#EC4899] text-white rounded-lg font-medium hover:bg-pink-600"
          >
            {currentScreen === screens.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

