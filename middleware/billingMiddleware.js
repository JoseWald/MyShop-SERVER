const billingProtection = (req, res, next) => {
    const { customer, givenAmount } = req.body;

    const regex = /\d/;
    if (customer.trim() === '' || regex.test(customer)) {
        return res.status(400).json({ message: "Invalid Name" });
    }

    if (isNaN(givenAmount) || givenAmount <= 0) {
        return res.status(400).json({ message: "The customer's money is invalid" });
    }

    next();
};

module.exports={billingProtection};
