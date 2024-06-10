import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";


class CommentController {
    constructor() {}

    async listComments(req: Request, res: Response) {
      try {
        const comments = await CommentDataBaseService.listDBComments;
        res.json({
          status: "ok",
          users: comments,
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async createComment(req: Request, res: Response) {
      const { postId, authorId } = req.body;

  
      if (!postId || !authorId) {
        res.json({
          status: "error",
          message: "Falta parâmetros",
        });
        return;
      }
  
      try {
        const newcomment = await CommentDataBaseService.insertDBComment({
            author: { connect: { id: authorId } },
            post: { connect: { id: postId } },
            created_at: new Date(),
            expiration: new Date(),
            update_at: new Date(),
            
        });
        res.json({
          status: "ok",
          newuser: newcomment,
        });
      } catch (error) {
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async updateComment(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      const { postId, authorId } = req.body;

      if (!postId || !authorId) {
        res.json({
          status: "error",
          message: "Falta parâmetros",
        });
        return;
      }
  
      try {
        const updatedComment = await CommentDataBaseService.updateDBComment(
          {
            author: { connect: { id: authorId } },
            post: { connect: { id: postId } },
            created_at: new Date(),
            expiration: new Date(),
            update_at: new Date(),
          },
          id
        );
        res.json({
          status: "ok",
          newuser: updatedComment,
        });
      } catch (error) {
        res.json({
          status: "error",
          message: error,
        });
      }
    }
  
    async deleteComment(req: Request, res: Response) {
      const id = req.params.id;
      if (!id) {
        res.json({
          status: "error",
          message: "Faltou o ID",
        });
      }
  
      try {
        const response = await CommentDataBaseService.deleteDBComment(id);
        if (response) {
          res.json({
            status: "ok",
            message: "Comment deletado com sucesso",
          });
        }
      } catch (error) {
        console.log(error);
        res.json({
          status: "error",
          message: error,
        });
      }
    }
}

export default new CommentController();