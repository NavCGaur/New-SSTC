import { faker } from '@faker-js/faker';
import { promises as fs } from 'fs';

// Constants
const SERVICES = [
  "GST Registration",
  "MSME Registration", 
  "Business Entity Registration",
  "GST Return Filing",
  "Income Tax Return Filing",
  "Accounting & BookKeeping"
];

const BUSINESS_TYPES = ['Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Public Limited', 'Trust', 'Others'];
const BUSINESS_CATEGORIES = ['Manufacturer', 'Trader', 'Service Provider', 'Others'];
const PAYMENT_STATUSES = ["Paid", "Pending"];
const USER_ROLES = ['User', 'Admin'];

// Types (if using TypeScript, uncomment these)
/*
interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface BusinessDetails {
  trade_name: string;
  legal_name: string;
  business_type: string;
  business_category: string;
  business_pan: string;
  date_of_establishment: Date;
  annual_turnover: number;
}

interface Service {
  serviceName: string;
  paymentStatus: string;
  nextDueDate: Date;
  notes: string;
}

interface User {
  name: string;
  email: string;
  phone_number: string;
  role: string;
  residential_address: Address;
  business_address: Address;
  business_details: BusinessDetails;
  services: Service[];
}
*/

// Helper functions
const generateAddress = () => ({
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  pincode: faker.location.zipCode()
});

const generateBusinessDetails = () => ({
  trade_name: faker.company.name(),
  legal_name: faker.company.name(),
  business_type: faker.helpers.arrayElement(BUSINESS_TYPES),
  business_category: faker.helpers.arrayElement(BUSINESS_CATEGORIES),
  business_pan: faker.string.alphanumeric(10).toUpperCase(),
  date_of_establishment: faker.date.past(),
  annual_turnover: faker.number.int({ min: 100000, max: 10000000 })
});

const generateUserServices = () => {
  const numServices = faker.number.int({ min: 0, max: SERVICES.length });
  const chosenServices = new Set();
  const userServices = [];

  while (chosenServices.size < numServices) {
    const randomIndex = faker.number.int({ min: 0, max: SERVICES.length - 1 });
    if (!chosenServices.has(randomIndex)) {
      chosenServices.add(randomIndex);
      userServices.push({
        serviceName: SERVICES[randomIndex],
        paymentStatus: faker.helpers.arrayElement(PAYMENT_STATUSES),
        nextDueDate: faker.date.future(),
        notes: faker.lorem.sentence()
      });
    }
  }

  return userServices;
};

const generateUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone_number: faker.phone.number('+91##########'),
  role: faker.helpers.arrayElement(USER_ROLES),
  residential_address: generateAddress(),
  business_address: generateAddress(),
  business_details: generateBusinessDetails(),
  services: generateUserServices()
});

/**
 * Generates mock user data
 * @param {number} count - Number of users to generate
 * @returns {Promise<void>}
 */
const generateMockData = async (count = 50) => {
  try {
    const users = Array.from({ length: count }, generateUser);
    const dataString = `const mockData = ${JSON.stringify(users, null, 2)};\n\nexport default mockData;`;
    
    await fs.writeFile('mockData.js', dataString);
    console.log(`Successfully generated ${count} mock users in mockData.js`);
    return users;
  } catch (error) {
    console.error('Error generating mock data:', error);
    throw error;
  }
};

// Execute the generator
generateMockData()
  .then(() => console.log('Mock data generation completed'))
  .catch(error => console.error('Failed to generate mock data:', error));

export { generateMockData };