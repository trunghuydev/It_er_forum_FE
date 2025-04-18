
interface CommentContent {
    comment_id: string;
    comment_content: string;
  }

export type TCommentResponse = {
    report_id: string;
    reported_user_id: string;
    reported_user_name: string;
    report_title: string;
    ava_img_path: string | null;
    comment_id: string;
    comment_content?: string;
    date_comment?: string;
}

export type TCommentDetailResponse = {
    reported_user_id: string;
    reported_user_name: string;
    reported_id: string;
    report_title: string;
    report_body: string;
    subject: string;
    date_reported: string;
    content: CommentContent;
    status?: string;
  }
