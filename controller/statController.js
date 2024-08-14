const factureModel = require('../model/factureModel');
const Prod=require('../model/prodModel');
const Stat=require('../model/stat');
const cron = require('node-cron');

exports.scheduleDailyCleanup = () => {
    cron.schedule('0 0 * * 0', async () => {
        try {
            await Stat.deleteMany({
                date: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            });
            console.log('Old weekly statistics removed');
        } catch (error) {
            console.error('Error removing old weekly stats:', error);
        }
    });
};

exports.dailyGain= async (req,res)=>{
    try{
        const start=new Date();
        start.setHours(0,0,0,0);

        const end=new Date();
        end.setHours(23,59,59,999);

        const data = await factureModel.find({
            date: { $gte: start, $lte: end }
        });

        const totalSum = data.reduce((sum, doc) => sum + (doc.totalAmount || 0), 0);

        res.status(200).json({message:totalSum});

    }catch(err){
        res.status(500).json({message:err.message})
    }


}

exports.prodNbr = async (req, res) => {
    try {
     
        const count = await Prod.countDocuments({});
        
        res.status(200).json({ message:count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.stockToReplenish = async (req, res) => {
    try {
        const products = await Prod.find({ quantity: { $lt: 10 } });
        
        res.status(200).json({ message:products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.outOfStock = async (req, res) => {
    try {

        const products = await Prod.find({ quantity: 0 });
        
        res.status(200).json({ message:products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getWeeklyStat = async (req, res) => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const endOfWeek = new Date();
        endOfWeek.setHours(23, 59, 59, 999);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

        const stats = await Stat.find({
            date: { $gte: startOfWeek, $lte: endOfWeek }
        });

        let weeklyStats = Array(7).fill(0);

        stats.forEach(stat => {
            const day = (new Date(stat.date)).getDay();
            weeklyStats[day] = stat.totalSales; 
        });

        res.status(200).json({ weeklyStats });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.mostSelled = async (req, res) => {
    try {
        const products = await Prod.find({});
        if (!products.length) {
            return res.status(404).json({ message: "Aucun produit trouvé" });
        }

        const productSales = products.map((prd) => {
            const soldQuantity = prd.max - prd.quantity;
            return {
                name: prd.name,
                sold: soldQuantity
            };
        });

        const topProducts = productSales.sort((a, b) => b.sold - a.sold).slice(0, 3);

        res.status(200).json({ topProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

