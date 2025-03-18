import Salary from '../models/Salary.js';

const addSalary = async (req, res) => { 
    try { 
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        // Ensure numeric values before calculations
        const totalSalary = Number(basicSalary) + Number(allowances) - Number(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary: Number(basicSalary),
            allowances: Number(allowances),
            deductions: Number(deductions),
            netSalary: totalSalary,
            payDate
        });

        await newSalary.save();

        return res.status(201).json({ success: true, message: "Salary added successfully!" });

    } catch (error) { 
        console.error("Error adding salary:", error);
        return res.status(500).json({ success: false, error: 'Salary add server error' });
    }
};

const getSalary = async (req, res) => {
    try { 
        const { id } = req.params;

        // Fetch salary details & populate with employee info
        const salary = await Salary.findOne({ employeeId: id }).populate('employeeId', 'name department');

        if (!salary) {
            return res.status(404).json({ success: false, error: "Salary not found for this employee." });
        }

        return res.status(200).json({ success: true, data: salary });

    } catch (error) {
        console.error("Error fetching salary:", error);
        return res.status(500).json({ success: false, error: 'Salary get server error' });
    }
};

export { addSalary, getSalary };
