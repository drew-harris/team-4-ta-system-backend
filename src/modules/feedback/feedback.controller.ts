import { Request, Response } from 'express';
import {
  createNewComment,
  createNewFeedback,
  getAllFeedback,
  getUserFeedback,
  getUserComment,
  getAllComments,
  getFeedbackById,
  setFeedbackStatus,
} from './feedback.service';
import { CustomJwtPayload } from 'middleware/authentication';


/**
 * Creates a new feedback/bug report
 * @param req the content of the feedback and the type
 * @param res the feedback item you created
 * @returns void
 */
export const createFeedbackRoute = async (req: Request, res: Response) => {
  try {
    const feedback = await createNewFeedback({
      type: req.body.type,
      content: req.body.content,
      userId: req.body.userId,
      status: req.body.status,
    });

    res.json(feedback);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

/**
 * Gets the feedback for a specific user
 * @param req nothing
 * @param res array of feedback items
 * @returns void
 */
export const getMyFeedbackRoute = async (_req: Request, res: Response) => {
  const user = res.locals.user as CustomJwtPayload;
  const userFeedback = await getUserFeedback(user.userId);
  console.log(userFeedback);
  res.json(userFeedback);
};

/**
 * Gets the feedback for a specific ID
 * @param req nothing
 * @param res array of feedback items
 * @returns void
 */
export const getFeedbackItemById = async (req: Request, res: Response) => {
  const feedbackId: number = parseInt(req.params.id);
  console.log(feedbackId);
  const feedback = await getFeedbackById(feedbackId);
  res.json(feedback);
};

/**
 * Sets the feedback status
 * @param req nothing
 * @param res array of feedback items
 * @returns void
 */
export const setStatus = async (req: Request, res: Response) => {
  const body = req.body;
  const feedbackNumber: number = body.id;
  const status: string = body.status;
  const response = await setFeedbackStatus(feedbackNumber, status);
  res.json(response);
};

/**
 * Gets ALL feedback for admins
 * @param req nothing
 * @param res array of feedback items
 * @returns void
 */
export const getAdminFeedback = async (_req: Request, res: Response) => {
  const allFeedback = await getAllFeedback();
  console.log(allFeedback);
  res.json(allFeedback);
};

/**
 * Creates a new comment report
 * @param req the content of the comment
 * @param res the comment item you created
 * @returns void
 */
export const createCommentRoute = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as CustomJwtPayload;
    const feedbackComment = await createNewComment({
      feedbackId: req.body.feedbackId,
      leftById: user.userId,
      content: req.body.content,
    });

    res.json(feedbackComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

/**
 * Gets the comment for a specific user
 * @param req nothing
 * @param res array of comment items
 * @returns void
 */
export const getMyCommentRoute = async (_req: Request, res: Response) => {
  const user = res.locals.user as CustomJwtPayload;
  const userFeedback = await getUserComment(user.userId);
  console.log(userFeedback);
  res.json(userFeedback);
};

/**
 * Gets ALL comment for admins
 * @param req nothing
 * @param res array of comment items
 * @returns void
 */
export const getAllUserComments = async (_req: Request, res: Response) => {
  const allFeedback = await getAllComments();
  console.log(allFeedback);
  res.json(allFeedback);
};
