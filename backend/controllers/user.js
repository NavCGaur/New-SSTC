import User from "../models/User.js";



export const getUser = async (req, res) => {
  try {
    // Extract query parameters with default values
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    console.log("Search Parameter Received:", search); // Log search to ensure it's coming through


    // Generate formatted sort object
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

   // Handle search query (if search is provided)
   const searchQuery = search.trim()
   ? {
       $or: [
         { name: { $regex: search.trim(), $options: "i" } },
         { email: { $regex: search.trim(), $options: "i" } },
         { phone_number: { $regex: search.trim(), $options: "i" } },
       ],
     }
   : {}; // Return empty object if search is empty or only contains spaces


    // Fetch users with pagination, sorting, and search
    const users = await User.find(searchQuery)
    .select("_id name email phone_number role createdAt services")
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(Number(pageSize));



    // Count total documents matching the search criteria
    const total = await User.countDocuments(searchQuery);

    // Check if no users found
    if (!users.length) {
      console.log("No users found");
      return res.status(200).json({ message: "No users found", users: [], total });
    }

    // Send the response
    res.status(200).json({ users, total });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getUserById = async (req, res) => {
  const { id } = req.params; // Extract ID from the request parameters
  try {
  

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as a response
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

export const postUser = async (req, res) => {
  try {
    console.log("Creating new user:", req.body);
    const userData = req.body;
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: error.message });
  }
};

export const editUserById = async (req, res) => {
  console.log("Request to edit user received", req.params, req.body);

  const { id } = req.params;
  const updatedData = req.body; // Extract updated data from request body

  try {
    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      console.log("No user found for editing");
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true // Validate the update operation
    });

    console.log("User updated successfully", updatedUser);
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error editing user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};



export const deleteUserById = async (req, res) => {
  console.log("userid found for deletion", req.params)

  const { id } = req.params;

  try {
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      console.log("No userid found for deletion")
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};