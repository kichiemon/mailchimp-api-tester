export interface MailchimpCampaign {
  id: string;
  web_id: number;
  type: string;
  status: string;
  settings: {
    subject_line: string;
    title: string;
    from_name: string;
    reply_to: string;
  };
  recipients: {
    list_id: string;
  };
}

export interface MailchimpError {
  type: string;
  title: string;
  status: number;
  detail: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status?: number;
}

