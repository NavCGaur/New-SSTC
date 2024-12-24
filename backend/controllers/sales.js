import User from "../models/User.js";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

export const getSales = async (req, res) => {
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
        const result = await User.aggregate([
          { $unwind: "$services" },
          { 
            $match: { 
              "services.paymentStatus": "Paid",
              "services.paidOn": { $gte: sixMonthsAgo }
            } 
          },
          {
            $group: {
              _id: {
                year: { $year: "$services.paidOn" },
                month: { $month: "$services.paidOn" },
              },
              totalSales: { $sum: 1 }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);
    
        const formattedResult = result.map(item => ({
          month: `${monthNames[item._id.month - 1]}`,
          totalSales: item.totalSales
        }));
    
        console.log(formattedResult);
        res.status(200).json(formattedResult);
    } catch (error) {
        console.error('Error fetching monthly paid services:', error);}
};



export const getPaidServiceCounts = async (req, res) => {
    try {
      console.log ("get paid service count controller")
      const paidCounts = await User.aggregate([
        { $unwind: "$services" },
        { $match: { "services.paymentStatus": "Paid" } },
        {
          $group: {
            _id: "$services.serviceName",
            count: { $sum: 1 },
          },
        },
      ]);
  
      // Transform data to required structure
      const salesByCategory = paidCounts.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {});
  
      const yearlySalesTotal = Object.values(salesByCategory).reduce(
        (sum, count) => sum + count,
        0
      );
  
      res.status(200).json({ salesByCategory, yearlySalesTotal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  };
  





