export type TDocsPost = {
    user_id: string;
    user_name: string;
    is_image: boolean;
    ava_img_path: string | null;
    post_title: string;
    date_updated: string;
    status: "Pending" | "Approved" | "Rejected";
    post_id: string;

}


export type TDocsPostDetail = {
    post_id: string;
    post_title: string;
    user_name: string;
    user_id: string;
    ava_img_path: string | null;
    post_content: string;
    status: "Pending" | "Approved" | "Rejected";
    img_url: string[];
    date_updated: string;
    tags: string[];
}