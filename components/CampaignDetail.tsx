import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

interface Campaign {
  id: string;
  web_id: number;
  type: string;
  status: string;
  create_time: string;
  send_time: string;
  emails_sent: number;
  settings: {
    subject_line: string;
    title: string;
    from_name: string;
    reply_to: string;
  };
  recipients: {
    list_id: string;
    list_name: string;
    segment_text: string;
    recipient_count: number;
  };
  report_summary?: {
    opens: number;
    unique_opens: number;
    open_rate: number;
    clicks: number;
    subscriber_clicks: number;
    click_rate: number;
  };
}

interface CampaignDetailProps {
  campaign: Campaign;
  onBack: () => void;
}

export function CampaignDetail({ campaign, onBack }: CampaignDetailProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <Button onClick={onBack} variant="ghost" className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>
        <CardTitle>{campaign.settings.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Campaign Details</h3>
            <p>ID: {campaign.id}</p>
            <p>Web ID: {campaign.web_id}</p>
            <p>Type: {campaign.type}</p>
            <p>Status: {campaign.status}</p>
            <p>Created: {new Date(campaign.create_time).toLocaleString()}</p>
            {campaign.send_time && <p>Sent: {new Date(campaign.send_time).toLocaleString()}</p>}
            <p>Emails Sent: {campaign.emails_sent}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Settings</h3>
            <p>Subject Line: {campaign.settings.subject_line}</p>
            <p>From Name: {campaign.settings.from_name}</p>
            <p>Reply-to: {campaign.settings.reply_to}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Recipients</h3>
            <p>List ID: {campaign.recipients.list_id}</p>
            <p>List Name: {campaign.recipients.list_name}</p>
            <p>Segment: {campaign.recipients.segment_text}</p>
            <p>Recipient Count: {campaign.recipients.recipient_count}</p>
          </div>
          {campaign.report_summary && (
            <div>
              <h3 className="text-lg font-semibold">Report Summary</h3>
              <p>Opens: {campaign.report_summary.opens}</p>
              <p>Unique Opens: {campaign.report_summary.unique_opens}</p>
              <p>Open Rate: {(campaign.report_summary.open_rate * 100).toFixed(2)}%</p>
              <p>Clicks: {campaign.report_summary.clicks}</p>
              <p>Subscriber Clicks: {campaign.report_summary.subscriber_clicks}</p>
              <p>Click Rate: {(campaign.report_summary.click_rate * 100).toFixed(2)}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

