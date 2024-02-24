const Invoice = require('../models/invoice');
const Customer = require('../models/customer');


module.exports.getAllInvoices = async (req, res) => {
    try {
        const allInvoices = await Invoice.find({});
        res.status(200).json(allInvoices);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getLatestInvoices = async (req, res) => {
    try {
        const limit = 5;
        const invoices = await Invoice.find({}).sort({ date: -1 }).limit(limit);
        const lastestInvoices = await Promise.all(invoices.map(async (invoice) => {
            const customer = await Customer.findById(invoice.customer_id);
            return {
                id: invoice._id,
                name: customer.name,
                image_url: customer.image_url,
                email: customer.email,
                amount: invoice.amount,
            }
        }
        ));
        res.status(200).json(lastestInvoices);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getInvoiceById = async (req, res) => {
    try {
        const {id} = req.params;
        const invoice = await Invoice.findById(id);
        res.status(200).json(invoice);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

module.exports.createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create(req.body);
        return res.status(201).json(newInvoice);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.deleteInvoice = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedInvoice = await Invoice.findByIdAndDelete(id);
        return res.status(204).json(deletedInvoice);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.updateInvoice = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedInvoice = await Invoice.findByIdAndUpdate(id,{...req.body}, {new: true});
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getInvoiceCount = async (req, res) => {
    try {
        const query = req.query.query;
        if(query){
            const customer = await Customer.findOne({ name: { $regex: query, $options: "i" } });
            if(!customer) return res.json(0);
            const count = await Invoice.countDocuments({customer_id : customer._id});
            return res.json(count);
        }
        const count = await Invoice.countDocuments({});
        return res.json(count);
      } catch (err) {
        return res.status(500).json({ error: err });
      }
};

module.exports.getInvoiceStatus = async (req,res)=> {
    try{
        const invoiceStatus = await Invoice.aggregate([
            {
                $group: {
                    _id: null,
                    paid: { $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] } },
                    pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, "$amount", 0] } }
                }
            }
        ]);
        res.status(200).json(invoiceStatus[0]);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getInvoiceStatusByCustomer = async (req, res) => {
    try {
        const query = req.query.query; // Obtener el valor de la consulta de la solicitud

        // Consulta para obtener los datos de las facturas del cliente con la consulta específica
        const invoiceStatus = await Customer.aggregate([
            {
                $lookup: {
                    from: "invoices", // Nombre de la colección de facturas
                    localField: "_id",
                    foreignField: "customer_id",
                    as: "invoices"
                }
            },
            {
                $unwind: {
                    path: "$invoices",
                    preserveNullAndEmptyArrays: true // Mantener documentos sin facturas
                }
            },
            {
                $match: query ? { "name": { $regex: query, $options: "i" } } : {}
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    image_url: { $first: "$image_url" },
                    total_invoices: { $sum: { $cond: [{ $eq: [{ $ifNull: ["$invoices", null] }, null] }, 0, 1] } }, // Ajuste aquí
                    total_paid: {
                        $sum: {
                            $cond: [{ $eq: ["$invoices.status", "paid"] }, "$invoices.amount", 0]
                        }
                    },
                    total_pending: {
                        $sum: {
                            $cond: [{ $eq: ["$invoices.status", "pending"] }, "$invoices.amount", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    image_url: 1,
                    total_invoices: 1,
                    total_paid: 1,
                    total_pending: 1
                }
            }
        ]);

        res.status(200).json(invoiceStatus);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/*module.exports.getInvoicesDetails = async (req, res) => {
    try {
        const query = req.query.query;
        const currentPage = parseInt(req.query.page) || 1;

        // Calcular el desplazamiento en función de la página actual
        const ITEMS_PER_PAGE = 6;
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const matchStage = query ? { "customerData.name": { $regex: query, $options: "i" } } : {};

        const invoices = await Invoice.aggregate([
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customerData"
                }
            },
            { $unwind: "$customerData" },
            { $match: matchStage },
            { $skip: offset },
            { $limit: ITEMS_PER_PAGE },
            {
                $group: {
                    _id: "$_id",
                    customer_id: { $first: "$customer_id" },
                    name: { $first: "$customerData.name" },
                    email: { $first: "$customerData.email" },
                    image_url: { $first: "$customerData.image_url" },
                    amount: { $first: "$amount" },
                    status: { $first: "$status" },
                    date: { $first: "$date" }
                }
            }
        ]);

        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json(error);
    }
}*/

// Función para buscar y ordenar las facturas
async function findAndSortInvoices(query, currentPage, ITEMS_PER_PAGE) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const matchStage = query ? { "customerData.name": { $regex: query, $options: "i" } } : {};

    const sortedInvoices = await Invoice.find(matchStage)
                                        .sort({ date: -1 }) // Ordenar por fecha en orden descendente (-1)
                                        .skip(offset)
                                        .limit(ITEMS_PER_PAGE)
                                        .populate('customer_id');

    return sortedInvoices;
}

// Función para agrupar las facturas
function groupInvoices(invoices) {
    const groupedInvoices = invoices.reduce((acc, invoice) => {
        if (!acc[invoice._id]) {
            acc[invoice._id] = {
                _id: invoice._id,
                customer_id: invoice.customer_id,
                name: invoice.customerData.name,
                email: invoice.customerData.email,
                image_url: invoice.customerData.image_url,
                amount: invoice.amount,
                status: invoice.status,
                date: invoice.date
            };
        }
        return acc;
    }, {});

    return Object.values(groupedInvoices);
}

module.exports.getInvoicesDetails = async (req, res) => {
    try {
        const query = req.query.query;
        const currentPage = parseInt(req.query.page) || 1;
        const ITEMS_PER_PAGE = 6;

        const sortedInvoices = await findAndSortInvoices(query, currentPage, ITEMS_PER_PAGE);

        const groupedInvoices = groupInvoices(sortedInvoices);

        res.status(200).json(groupedInvoices);
    } catch (error) {
        res.status(500).json(error);
    }
}