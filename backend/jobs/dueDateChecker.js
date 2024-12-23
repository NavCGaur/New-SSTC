// jobs/dueDateChecker.js
import cron from 'node-cron';
import User from '../models/User.js';
import { sendDueDateNotification } from '../utils/emailService.js';

const checkUpcomingDueDates = async () => {
  try {
    // Get current date and date 5 days from now
    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);

    // Find users with services due in 5 days
    const users = await User.find({
      'services.nextDueDate': {
        $gte: today,
        $lte: fiveDaysFromNow
      }
    });

    for (const user of users) {
      // Check each service for the user
      for (const service of user.services) {
        const dueDate = new Date(service.nextDueDate);
        const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

        // If service is due in exactly 5 days
        if (daysUntilDue === 5) {
          await sendDueDateNotification(
            user.email,
            service.serviceName,
            service.nextDueDate
          );
        }
      }
    }
  } catch (error) {
    console.error('Error checking due dates:', error);
  }
};

// Run the cron job every day at midnight
const initializeDueDateChecker = () => {
  cron.schedule('0 0 * * *', checkUpcomingDueDates);
};

export default initializeDueDateChecker;