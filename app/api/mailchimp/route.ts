import { NextRequest, NextResponse } from 'next/server'

interface MailchimpError {
  type: string;
  title: string;
  status: number;
  detail: string;
}

async function handleMailchimpRequest(url: string, options: RequestInit) {
  console.log(`Making Mailchimp API request to: ${url}`);
  console.log('Request options:', JSON.stringify(options, null, 2));
  console.log('Headers:', JSON.stringify(options.headers, null, 2));

  const response = await fetch(url, {
    ...options,
    headers: options.headers,
  });
  console.log(`Received response with status: ${response.status}`);

  const contentType = response.headers.get("content-type");
  console.log(`Response content type: ${contentType}`);
  
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await response.json();
    console.log('Parsed JSON response:', JSON.stringify(data, null, 2));
    if (!response.ok) {
      const error = data as MailchimpError;
      console.error('Mailchimp API error:', error);
      throw new Error(`Mailchimp API error: ${error.detail}`);
    }
    return data;
  } else {
    const text = await response.text();
    console.error('Unexpected non-JSON response:', text);
    throw new Error(`Unexpected response: ${text}`);
  }
}

export async function POST(req: NextRequest) {
  console.log('Received POST request to /api/mailchimp');
  try {
    const { apiKey, method, endpoint, body } = await req.json();
    console.log(`Request details: method=${method}, endpoint=${endpoint}`);
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const dc = apiKey.split('-')[1] || 'us13';
    const baseUrl = `https://${dc}.api.mailchimp.com/3.0`;
    const url = `${baseUrl}${endpoint}`;
    console.log(`Using Mailchimp API URL: ${url}`);

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    let result;
    console.log('Processing request...');
    switch (endpoint) {
      case '/campaigns':
        if (method === 'GET') {
          console.log('Getting all campaigns');
          result = await handleMailchimpRequest(url, { method, headers });
        }
        break;
      case '/campaigns/:id':
        if (method === 'GET') {
          console.log(`Getting campaign: ${body.campaignId}`);
          result = await handleMailchimpRequest(`${baseUrl}/campaigns/${body.campaignId}`, { method, headers });
        }
        break;
      case '/campaigns/replicate':
        console.log(`Replicating campaign: ${body.campaignId}`);
        result = await handleMailchimpRequest(`${baseUrl}/campaigns/${body.campaignId}/actions/replicate`, {
          method: 'POST',
          headers,
        });
        break;
      case '/campaigns/send':
        console.log(`Sending campaign: ${body.campaignId}`);
        result = await handleMailchimpRequest(`${baseUrl}/campaigns/${body.campaignId}/actions/send`, {
          method: 'POST',
          headers,
        });
        break;
      case '/lists/:listId/segments':
        if (method === 'GET') {
          console.log(`Getting all segments for list: ${body.listId}`);
          result = await handleMailchimpRequest(`${baseUrl}/lists/${body.listId}/segments`, { method, headers });
        } else if (method === 'POST') {
          console.log(`Creating segment for list: ${body.listId}`);
          const segmentData: any = {
            name: body.segmentName,
          };

          if (body.emails && body.emails.length > 0) {
            // Static segment
            segmentData.static_segment = body.emails;
          } else {
            // Dynamic segment
            segmentData.options = {
              match: body.match || 'any',
              conditions: body.conditions || []
            };
          }

          result = await handleMailchimpRequest(`${baseUrl}/lists/${body.listId}/segments`, {
            method: 'POST',
            headers,
            body: JSON.stringify(segmentData),
          });
        }
        break;
      case '/lists/update-contact':
        console.log(`Updating contact: listId=${body.listId}, subscriberHash=${body.subscriberHash}`);
        result = await handleMailchimpRequest(`${baseUrl}/lists/${body.listId}/members/${body.subscriberHash}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(body.data),
        });
        break;
      default:
        console.log(`Invalid endpoint: ${endpoint}`);
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    console.log('Request processed successfully');
    console.log('Result:', JSON.stringify(result, null, 2));
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('Mailchimp API error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An error occurred',
      status: 500 
    }, { 
      status: 500 
    });
  }
}

export async function OPTIONS(req: NextRequest) {
  console.log('Received OPTIONS request to /api/mailchimp');
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

