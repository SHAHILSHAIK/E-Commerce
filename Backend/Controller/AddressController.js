const Address = require('../Model/Address');

const saveAddress = async (req, res) => {
  const { DoorNo, Street, City, District, State, Pincode } = req.body;

  try {
    const newAddress = new Address({
      DoorNo,
      Street,
      City,
      District,
      State,
      Pincode,
    });

    await newAddress.save();

    res.status(200).json({ message: 'Address added successfully' });
  } catch (error) {
    console.error('❌ Error saving address:', error.message);
    res.status(500).json({ message: 'Error saving address', error: error.message });
  }
};

module.exports = { saveAddress };
