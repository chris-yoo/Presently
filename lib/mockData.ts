// Mock data for development without backend

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  location?: string;
  job?: string;
  profileImage?: string;
  statusMessage?: string;
  giverProfile?: GiverProfile;
  receiverProfile?: ReceiverProfile;
  primaryReason?: string;
}

export interface GiverProfile {
  recipientType: string[];
  occasion: string;
  budget: string;
  ageRange: string;
  interests: string[];
  categories: string[];
}

export interface ReceiverProfile {
  interests: string[];
  categories: string[];
  style: string;
  avoid: string[];
  extraInfo?: {
    clothingSize?: string;
    shoeSize?: string;
    notes?: string;
  };
  shippingAddress?: string;
  wishlist?: WishlistItem[];
}

export interface WishlistItem {
  id: string;
  name: string;
  description: string;
  image?: string;
  link?: string;
}

export interface Friend {
  id: string;
  name: string;
  profileImage?: string;
  statusMessage?: string;
  receiverProfile?: ReceiverProfile;
  birthday?: string;
  giftExchangeCount?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  link: string;
  category: string;
}

export interface GiftHistory {
  id: string;
  type: "sent" | "received";
  product: Product;
  recipientOrSender: string;
  date: string;
}

// Mock User Data
export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  age: 28,
  location: "Seoul, Gangnam",
  job: "Software Engineer",
  profileImage: "https://via.placeholder.com/150",
  statusMessage: "Looking for the perfect gift!",
  primaryReason: "Gifts for work colleagues",
  giverProfile: {
    recipientType: ["Friends", "Work Colleagues"],
    occasion: "Birthday",
    budget: "$30-$50",
    ageRange: "20s-30s",
    interests: ["Tech", "Coffee", "Books"],
    categories: ["Digital", "Food", "Books"],
  },
  receiverProfile: {
    interests: ["🏃Sports", "☕Coffee/Tea", "💻IT/Gadgets", "📚Reading"],
    categories: ["Digital", "Books", "Food"],
    style: "Practical/Daily Use",
    avoid: ["Flowers", "Specific Scents"],
    wishlist: [],
  },
};

// Mock Friends Data
export const mockFriends: Friend[] = [
  {
    id: "friend-1",
    name: "Alice Kim",
    profileImage: "https://via.placeholder.com/150",
    statusMessage: "Coffee lover ☕",
    birthday: "2025-12-15",
    giftExchangeCount: 5,
    receiverProfile: {
      interests: ["☕Coffee/Tea", "🍳Cooking", "📚Reading"],
      categories: ["Food", "Kitchen", "Books"],
      style: "Practical/Daily Use",
      avoid: [],
    },
  },
  {
    id: "friend-2",
    name: "Bob Lee",
    profileImage: "https://via.placeholder.com/150",
    statusMessage: "Tech enthusiast",
    birthday: "2025-11-20",
    giftExchangeCount: 3,
    receiverProfile: {
      interests: ["💻IT/Gadgets", "🎮Gaming", "🎧Music"],
      categories: ["Digital", "Gaming"],
      style: "Fun/Unique",
      avoid: [],
    },
  },
  {
    id: "friend-3",
    name: "Carol Park",
    profileImage: "https://via.placeholder.com/150",
    statusMessage: "Fashionista 👗",
    birthday: "2026-01-10",
    giftExchangeCount: 8,
    receiverProfile: {
      interests: ["👕Fashion", "💄Beauty", "🛋️Interior"],
      categories: ["Fashion", "Beauty", "Accessories"],
      style: "Emotional/Beautiful",
      avoid: ["Clothing (sizing)"],
    },
  },
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "Sony WH-1000XM6",
    description: "최고 등급 액티브 노이즈캔슬링, 32시간 배터리, 맞춤형 EQ.",
    image:
      "https://d1ncau8tqf99kp.cloudfront.net/converted/128942_original_local_1200x1050_v3_converted.webp",
    price: 399.99,
    link: "https://www.sony.com/electronics/headband-headphones/wh-1000xm6",
    category: "Headphones",
  },
  {
    id: "prod-2",
    name: "Apple Watch Series 9",
    description:
      "강력해진 칩, 건강 모니터링, 스마트 알림 지원 최신 스마트워치.",
    image:
      "https://www.apple.com/v/watch/bt/images/overview/select/product_s11__c23ym6fc09me_large_2x.png",
    price: 399.0,
    link: "https://www.apple.com/watch/",
    category: "Smartwatch",
  },
  {
    id: "prod-3",
    name: "Kindle Paperwhite 5",
    description:
      "가독성 좋은 고해상도 e-잉크 디스플레이, 방수 기능, 내장 조명.",
    image: "https://m.media-amazon.com/images/I/61DPHELlf0L._AC_SX679_.jpg",
    price: 139.99,
    link: "https://www.amazon.com/kindle-paperwhite",
    category: "E-Reader",
  },
  {
    id: "prod-4",
    name: "JBL Flip 7",
    description: "작고 강력한 방수 블루투스 포터블 스피커, 12시간 배터리.",
    image:
      "https://kr.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw7209951c/JBL_FLIP_7_HERO_BLACK_060_x2.jpg?sw=556&sh=680&sm=fit&sfrm=png",
    price: 129.95,
    link: "https://kr.jbl.com/FLIP-7.html?dwvar_FLIP-7_color=Black-GLOBAL-Current&cgid=portable-speaker#start=1",
    category: "Speaker",
  },
  {
    id: "prod-5",
    name: "Philips Hue Starter Kit",
    description: "스마트 홈 조명 시스템, 음성 제어 및 원격 조명 관리.",
    image:
      "https://www.assets.signify.com/is/image/Signify/Hue-bundle-syncbox-play-bar-2P-BL-gradient-LS?wid=1280&hei=960&qlt=82",
    price: 179.99,
    link: "https://www.philips-hue.com/de-at/p/hue-bundle-2-play-light-bars-1-tv-lightstrip-75-inch-sync-box-8k/330180",
    category: "Smart Home",
  },
  {
    id: "prod-6",
    name: "Bose QuietComfort Earbuds",
    description: "뛰어난 노이즈 캔슬링, 천연 사운드, 6시간 연속 재생.",
    image:
      "https://assets.bosecreative.com/transform/d5b4b533-53fc-4bf1-96b1-d0a12fda8910/UOEBLE25-CarbonBlue_SF_ECOMM_GALLERY_01?quality=100&io=width:400,height:300,transform:fit&io=width:400,height:300,transform:fit",
    price: 279.0,
    link: "https://www.bose.com/c/earbuds",
    category: "Earbuds",
  },
];

// Mock Gift History
export const mockGiftHistory: GiftHistory[] = [
  {
    id: "history-1",
    type: "sent",
    product: mockProducts[0],
    recipientOrSender: "Alice Kim",
    date: "2024-10-15",
  },
  {
    id: "history-2",
    type: "received",
    product: mockProducts[2],
    recipientOrSender: "Bob Lee",
    date: "2024-09-20",
  },
];

// Mock function to get recommendations (simulating AI API)
export const getRecommendations = async (
  giverProfile: GiverProfile,
  receiverProfile?: ReceiverProfile
): Promise<Product[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simple mock logic - filter products based on categories
  let filtered = mockProducts;

  if (receiverProfile) {
    filtered = mockProducts.filter((p) =>
      receiverProfile.categories.includes(p.category)
    );
  }

  // If no matches, return top products
  if (filtered.length === 0) {
    filtered = mockProducts.slice(0, 3);
  }

  return filtered.slice(0, 5);
};
