export const checkWorkers = async (staff, id) => {
    try {
        const workerExists = staff.workers.some((data) => data._id.toString() === id.toString());
        return workerExists;
    } catch (error) {
        return error.message;
    }
}