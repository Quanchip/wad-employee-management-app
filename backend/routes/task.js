// Get employee task statistics
router.get('/employee-stats', authenticateToken, async (req, res) => {
    try {
        const employeeId = req.user.id;
        
        // Get personal tasks
        const personalTasks = await Task.find({ assignedTo: employeeId });
        
        // Get team tasks where employee is a member
        const teamTasks = await Task.find({
            'team.members': employeeId
        });

        // Combine all tasks
        const allTasks = [...personalTasks, ...teamTasks];
        
        // Calculate statistics
        const stats = {
            total: allTasks.length,
            completed: allTasks.filter(task => task.complete).length,
            pending: allTasks.filter(task => !task.complete).length
        };

        res.json({
            success: true,
            stats
        });
    } catch (error) {
        console.error('Error getting task statistics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get task statistics'
        });
    }
}); 