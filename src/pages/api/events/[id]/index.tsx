import { NextApiRequest, NextApiResponse } from 'next';
import { findById, findByIdAndUpdate } from '../../../../../db';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    switch (req.method) {
        case 'GET':
            // Get all events
            try {
                const event = findById(id as string);
                res.status(200).json(event);
            } catch (error) {
                console.warn(error)
            }
            break;

        case 'PUT':
            try {
                const event = findByIdAndUpdate(id as string, req.body);
                res.status(200).json(event);
            } catch (error) {
                console.warn(error);
            }
        /* const userIndex = users.findIndex(u => u.id === userId);
         if (userIndex === -1) {
             return res.status(404).json({ message: 'User not found' });
         }

         // Update the user data
         users[userIndex] = { id: userId, name, email };
         res.json(users[userIndex]); // Return the updated user*/
        default:
            res.status(405).end(); // Method Not Allowed
    }
}
