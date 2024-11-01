import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import historyEntryModel from '../models/HistoryEntry';
import { Question } from 'models/Question';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
};

const extractUserIdFromToken = (req: Request): string | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.error('Authorization header missing');
      return null;
    }
  
    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error('Token missing from authorization header');
      return null;
    }
  
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload;
      if (decodedToken && typeof decodedToken === 'object' && 'id' in decodedToken) {
        return decodedToken.id as string;
      } else {
        console.error('Token payload does not contain user ID');
        return null;
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  };

export const getUserHistoryEntries = async (req: Request, res: Response) => {
  try {
    const userId = extractUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const historyEntries = await historyEntryModel.find({ userId })
    .populate({
      path: 'question',
      populate: {
        path: 'categories',
        model: 'category',
      },
    });
    const historyViewModels = historyEntries.map((entry) => {
      return {
        id: entry._id,
        key: entry._id,
        attemptStartedAt: entry.attemptStartedAt.getTime(),
        attemptCompletedAt: entry.attemptCompletedAt.getTime(),
        title: entry.question.title,
        difficulty: entry.question.difficulty,
        topics: entry.question.categories.map((cat: any) => cat.name),
        attemptCode: entry.attemptCode,
    }});
    res.status(200).json(historyViewModels);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const createOrUpdateUserHistoryEntry = async (req: Request, res: Response) => {
  try {
    // Extract userId from the token
    const userId = extractUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    // Destructure required fields from the request body
    const { questionId, roomId, attemptStartedAt, attemptCompletedAt, collaboratorId, attemptCode } = req.body;

    // Validate required fields (optional but recommended)
    if (!roomId) {
      return res.status(400).json({ error: 'roomId is required' });
    }

    // Attempt to find an existing history entry with the same userId and roomId
    const existingEntry = await historyEntryModel.findOne({ userId, roomId });

    if (existingEntry) {
      existingEntry.question = questionId;
      existingEntry.attemptStartedAt = attemptStartedAt;
      existingEntry.attemptCompletedAt = attemptCompletedAt;
      existingEntry.collaboratorId = collaboratorId;
      existingEntry.attemptCode = attemptCode;

      const updatedEntry = await existingEntry.save();

      return res.status(200).json(updatedEntry);
    } else {
      const newHistoryEntry = new historyEntryModel({
        userId,
        question: questionId,
        roomId,
        attemptStartedAt,
        attemptCompletedAt,
        collaboratorId,
        attemptCode,
      });

      const savedEntry = await newHistoryEntry.save();

      return res.status(201).json(savedEntry);
    }
  } catch (error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteUserHistoryEntry = async (req: Request, res: Response) => {
  try {
    const userId = extractUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const { id } = req.params;

    const deletedEntry = await historyEntryModel.findOneAndDelete({ _id: id, userId });

    if (!deletedEntry) {
      return res.status(404).json({ message: 'History entry not found' });
    }

    res.status(200).json({ message: 'History entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteUserHistoryEntries = async (req: Request, res: Response) => {
  try {
    const userId = extractUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const { ids } = req.body;
    if (!Array.isArray(ids)) {
      return res.status(400).json({ message: '"ids" must be an array of history entry IDs.' });
    }

    const result = await historyEntryModel.deleteMany({ _id: { $in: ids }, userId });
    res.status(200).json({ message: `${result.deletedCount} history entries deleted.` });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

export const deleteAllUserHistoryEntries = async (req: Request, res: Response) => {
  try {
    const userId = extractUserIdFromToken(req);

    if (!userId) {
      return res.status(401).json({ error: 'Invalid or missing token' });
    }

    const result = await historyEntryModel.deleteMany({ userId });
    res.status(200).json({
      message: `${result.deletedCount} history entries deleted for user ${userId}.`,
    });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
