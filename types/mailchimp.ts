/** @format */

export interface CreateCampaignInput {
  type: string;
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

export interface UpdateCampaignInput {
  settings?: {
    subject_line?: string;
    title?: string;
    from_name?: string;
    reply_to?: string;
  };
}

export interface CreateSegmentInput {
  name: string;
  static_segment: string[];
}
export interface UpdateSegmentInput {
  name?: string;
  static_segment?: string[];
}
export interface MailchimpList {
  id: string;
  name: string;
  contact: {
    company: string;
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

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
