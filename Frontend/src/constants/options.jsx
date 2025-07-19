// src/constants/options.jsx
import { FaUser, FaUsers, FaChild, FaWallet, FaBalanceScale, FaCrown } from "react-icons/fa";

export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: <FaUser />,
    people: '1 Person'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: <FaUsers />,
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun-loving adventurers',
    icon: <FaChild />,
    people: '3 to 5 People'
  }
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Budget',
    desc: 'Keep it cost-effective',
    icon: <FaWallet />
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: <FaBalanceScale />
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Don’t worry about cost',
    icon: <FaCrown />
  }
];

export const AI_PROMPT = "Generate Travel Plan for Location: {location}";
